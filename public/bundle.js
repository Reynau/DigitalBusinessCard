(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Loader {
  constructor () {
    this.photo = document.getElementById('photo')
    this.nameField = document.getElementById('name')
    this.titleField = document.getElementById('title')
    this.descriptionField = document.getElementById('description')

    this.socialmedia = document.getElementById('socialmedia')
    this.twitter = document.getElementById('twitter')
    this.facebook = document.getElementById('facebook')
    this.linkedin = document.getElementById('linkedin')
    this.instagram = document.getElementById('instagram')
  }

  loadData (path, callback) {
    var httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var data = JSON.parse(httpRequest.responseText)
          if (callback) callback(data)
        }
      }
    }
    httpRequest.open('GET', path)
    httpRequest.send()
  }

  fillPageWithData () {
    const self = this
    this.loadData('data/data.json', (data) => {
      document.title = data.name
      self.photo.src = data.photo
      self.nameField.textContent = data.name
      self.titleField.textContent = data.title
      data.description.forEach(description => {
        const p = document.createElement('P')
        p.innerText = description
        self.descriptionField.appendChild(p)
      })
      if (data.media.twitter) self.addSocialMediaLink(data.media.twitter, 'fa-twitter-square')
      if (data.media.facebook) self.addSocialMediaLink(data.media.facebook, 'fa-facebook-square')
      if (data.media.linkedin) self.addSocialMediaLink(data.media.linkedin, 'fa-linkedin')
      if (data.media.instagram) self.addSocialMediaLink(data.media.instagram, 'fa-instagram')
    })
  }

  addSocialMediaLink (link, iconClass) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const i = document.createElement('i')
    i.classList.add('fab')
    i.classList.add(iconClass)
    a.href = link
    a.appendChild(i)
    li.appendChild(a)
    self.socialmedia.appendChild(li)
  }
}

module.exports = Loader

},{}],2:[function(require,module,exports){
const Loader = require('./Loader')

window.onload = () => {
  const loader = new Loader()
  loader.fillPageWithData()
}

},{"./Loader":1}]},{},[1,2]);
