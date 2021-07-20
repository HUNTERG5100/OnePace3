function Info(request, extra, javascriptConfig, output) {
    this.request = request;
    this.extra = extra;
    this.javascriptConfig = javascriptConfig;
    this.output = output;
}

function ModuleRequest(url, method, headers, httpBody) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.httpBody = httpBody;
}

function Extra(commands, extraInfo) {
    this.commands = commands;
    this.extraInfo = extraInfo;
}

function Commands(commandName, params) {
    this.commandName = commandName;
    this.params = params;
}

function JavascriptConfig(removeJavascript, loadInWebView, javaScript) {
    this.removeJavascript = removeJavascript;
    this.loadInWebView = loadInWebView;
    this.javaScript = javaScript;
}

function KeyValue(key, value) {
    this.key = key;
    this.value = value;
}

function Chapter(chapName, link, openInWebView) {
    this.chapName = chapName;
    this.link = link;
    this.openInWebView = openInWebView;
}

function Output(image, title, link, description, genres, field1, field2, field3, field4, chapters) {
    this.image = image;
    this.link = link;
    this.title = title;
    this.description = description;
    this.genres = genres;
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
    this.field4 = field4;
    this.chapters = chapters;
}

function getStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        let data = array[x].innerText;
        if (data.includes(match)) {
            return data.replace(match, '').trim();
        }
    }
}

function getHtmlStuff(array, match) {
    for (var x = 0; x < array.length; x++) {
        let data = array[x].innerText;
        if (data.includes(match)) {
            return array[x];
        }
    }
}
var savedData = document.getElementById('ketsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
let emptyKeyValue = [new KeyValue('', '')];
var episodes = [];
var type = ' ';
var status = '';
var genres = [];
var desc = '';
var animeInfo = document.querySelector('.anime_info_body');
var title = animeInfo.querySelector('h1').innerText;
var image = animeInfo.querySelector('img').src;
image = new ModuleRequest(image, 'get', emptyKeyValue, null);
var forData = document.querySelectorAll('.type');
for (var x = 0; x < forData.length; x++) {
    var text = '' + forData[x].innerText;
    if (text.includes('Type: ')) {
        type = text.replace('Type: ').replace('undefined', '');
    }
    if (text.includes('Genre: ')) {
        var gen = forData[x].querySelectorAll('a');
        for (var y = 0; y < gen.length; y++) {
            genres.push(gen[y].innerText.replace(',', ''));
        }
    }
    if (text.includes('Plot Summary: ')) {
        desc = text.replace('Plot Summary: ').replace('undefined', '');
    }
    if (text.includes('Status: ')) {
        status = text.replace('Status: ', '');
    }
    if (text.includes('Released: ')) {
        var show_year = text.replace('Released: ', '');
    }
}
var chapters = document.querySelector('.active').getAttribute('ep_end');

let anime_id = document.querySelector('.anime_info_episodes_next > input').getAttribute('value');
let respUrl = 'https://' + parsedJson.responseInfo.responseUrl.split('/')[2];
let extraInfo = [new KeyValue('respUrl', respUrl)];

let infoPageObject = new Info(new ModuleRequest('https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end='+chapters+'&id='+anime_id, 'get', emptyKeyValue, null), new Extra([new Commands('', emptyKeyValue)], extraInfo), new JavascriptConfig(false, false, ''), new Output(image, title, parsedJson.request, desc, genres, status, show_year, type, 'Eps: '+chapters, episodes));
var finalJson = JSON.stringify(infoPageObject);
savedData.innerHTML = finalJson;
