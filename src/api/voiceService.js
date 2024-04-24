const VoiceRSS = {
  speech: function ({ text, callback }) {
    const settings = {
      key: 'eccbfed46e934467b7eba1b07b7e2cf8',
      src: text,
      hl: 'en-us',
      v: 'Linda',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false,
    };
    this._validate(settings);
    this._request(settings, callback);
  },
  _validate: function (settings) {
    if (!settings) throw new Error('The settings are undefined');
    if (!settings.key) throw new Error('The API key is undefined');
    if (!settings.src) throw new Error('The text is undefined');
    if (!settings.hl) throw new Error('The language is undefined');
    if (settings.c && 'auto' !== settings.c.toLowerCase()) {
      const audio = new Audio();
      const canPlay = audio.canPlayType(`audio/${settings.c}`).replace('no', '');
      if (!canPlay)
        throw new Error(`The browser does not support the audio codec ${settings.c}`);
    }
  },
  _request: function (settings, callback) {
    const params = new URLSearchParams({
      key: settings.key,
      src: settings.src,
      hl: settings.hl,
      v: settings.v,
      r: settings.r,
      c: settings.c,
      f: settings.f,
      ssml: settings.ssml,
      b64: true,
    }).toString();

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText.indexOf('ERROR') === 0) {
          throw new Error(xhr.responseText);
        }
        callback(xhr.responseText);
      }
    };
    xhr.open('POST', 'https://api.voicerss.org/', true);
    xhr.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    xhr.send(params);
  },
};

export default VoiceRSS;
