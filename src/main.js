import {el, addEvent} from './utility.js';
import Twiter from './twiter.js';

import users from './user.json';
const user = users && users.length ? users[0] : null;
if(!user){
	throw 'Please login to continue.';
}

const frag = document.createDocumentFragment();

const card = el('div', ['card'], void 0, `background-image: ${user.banner}`);

const nickname = el('span', ['nickname']);
nickname.innerHTML = user.nickname;
card.appendChild(nickname);

const cls = ['avatar'];
if(user.hasNewTwiter){
	cls.push('has-new-twiter');
}
const avatarContains = el('a', cls, {
	href: 'javascript: void 0;'
});
const avatar = el('img', void 0, {
	src: user.avatar
});
avatarContains.appendChild(avatar);

card.appendChild(avatarContains);

frag.appendChild(card);


// get latest twiters by ajax
import twiters from './twiters.json';

const contains = el('ul', ['twiters']);
const ts = Twiter.renderList(twiters);
contains.appendChild(ts);

frag.appendChild(contains);

function reScale(){
	const html = document.documentElement;
	const width = html.clientWidth;
	const fontSize = width / 375 * 100;

	html.style.fontSize = fontSize + 'px';
}

addEvent(window, 'orientationchange' in window ? 'orientationchange' : 'resize', reScale);
addEvent(document, 'DOMContentLoaded', reScale);
addEvent(window, 'load', function(){
	const loading = document.getElementById('loading');
	document.body.removeChild(loading);
	document.body.appendChild(frag);
});

