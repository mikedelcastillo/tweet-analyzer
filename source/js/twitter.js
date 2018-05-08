const axios = require('axios');
const CancelToken = axios.CancelToken;
const xml2js = require('xml2js').parseString;

const emojiRegex = /\&\#.{6}\;/gmi;
const linkRegex = /http[a-z0-9\.\/\:\?\#]*/gmi;
const escapeRegex = /<.*?>|pic[a-z0-9\.\/]*/gmi;
const usernameRegex = /@|\(|\)/gmi;

module.exports = (username, getCancel = () => {}) => {
  const source = CancelToken.source();
  let loaded = false;

  username = username.replace(usernameRegex, "").trim();
  const promise = new Promise((resolve, reject) => {
    const url = `https://twitrss.me/twitter_user_to_rss/?user=${username}`;
    axios
    .get(url, {
      cancelToken: source.token
    })
    .then((response) => {
      if(response.data){
        xml2js(response.data, (err, data) => {
          if(err){
            throw new Error("XML Error");
          } else{
            const raw = data.rss.channel[0];
            const image = raw.image[0].url[0].trim();
            const title = raw.title[0].trim();
            const tweets = raw.item.map(item => {
              const html = item["description"][0].trim();
              const text = html.replace(escapeRegex, "").trim();

              const links = [];
              linkRegex.lastIndex = 0;
              while(match = linkRegex.exec(html)){
                links.push(match[0]);
              }

              const emojis = [];
              emojiRegex.lastIndex = 0;
              while(match = emojiRegex.exec(html)){
                emojis.push(match[0]);
              }

              return {
                username: item["dc:creator"][0].trim().replace(usernameRegex, "").trim(),
                emojis,
                text,
                html,
                links,
                link: item["link"][0],
                date: new Date(item["pubDate"][0])
              };
            });
            resolve({
              username, title, image, tweets
            });
          }
        });
      } else{
        throw new Error("No data");
      }
    })
    .catch((error) => {
      reject(error)
    })
    .finally(() => {
      loaded = true;
    });
  });

  getCancel(() => {
    if(!loaded){
      source.cancel('Operation canceled by the user.');
    }
  });


  return promise;
}
