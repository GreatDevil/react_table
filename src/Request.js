function Request(url, func){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    func({text: '', load: 1}, 0);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200)
            func({data: 0}, null);
        else
            func({load: 0, data: JSON.parse(xhr.responseText)}, null);
    }
}

export default Request;