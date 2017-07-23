/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 创建dom元素，并附加class, attribute
 *
 * @param tag <String> 有效的html元素名
 * @param cls <Array> 附加的class列表
 * @param attr <Array> 附加的attribute
 * @param style <String> 附加的行内样式\
 * 
 * @return <Object Element> DOM对象
 */
function el(tag, cls, attr, style) {
	if (!tag) {
		throw 'tagName is empty';
	}

	var t = document.createElement(tag);

	// @todo
	if (attr) {
		for (var key in attr) {
			if (attr.hasOwnProperty(key)) {
				t.setAttribute(key, attr[key]);
			}
		}
	}

	if (cls && cls.length) {
		t.className = cls.join(' ');
	}

	if (style) {
		//
	}

	return t;
}

/**
 * 格式化发布时间
 * 
 * @param date <Number> 有效的时间戳
 * 
 * @return <String> 格式化后的“发布时间”
 */
function getNewsTime(date) {
	date = date ? new Date(date) : new Date();
	var now = new Date();

	var diff = {};
	diff.year = now.getYear() - date.getYear();
	diff.date = now.getDate() - date.getDate();
	diff.hour = now.getHours() - date.getHours();
	// diff.minute = now .getMinutes() - date.getMinutes();

	if (diff.year > 1) {
		return '很早以前';
	}

	var n = '';
	if (diff.date < 1) {
		if (diff.hour < 1) {
			n = '刚刚';
		} else {
			n = diff.hour + '小时前';
		}
	} else if (diff.date === 1) {
		n = '昨天';
	} else if (diff.date > 15) {
		n = '半个月前';
	} else {
		n = diff.date + '天前';
	}

	return n;
}

function addEvent(dom, event, handle, useCapture) {
	useCapture = !!useCapture;

	if (document.addEventListener) {
		dom.addEventListener(event, function (e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			handle.call(this, e, target);
		}, useCapture);
	}

	if (document.attachEvent) {
		dom.attachEvent('on' + event, function (e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			handle.call(this, e, target);
		}, useCapture);
	}
}

// export {el: el, getNewsTime: getNewsTime};
module.exports = {
	el: el,
	getNewsTime: getNewsTime,
	addEvent: addEvent
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [{"id":1001,"nickname":"星星点灯","avatar":"./assets/photo.jpg","hasNewTwiter":true,"banner":"/assets/friendcircle-banner.png"},{"id":1002,"nickname":"甲壳虫","avatar":"/assets/avata.png","hasNewTwiter":false,"banner":"/assets/friendcircle-banner.png"},{"id":1003,"nickname":"Just do IT.","avatar":"/assets/avata.png","hasNewTwiter":false,"banner":"/assets/friendcircle-banner.png"},{"id":1004,"nickname":"张小六","avatar":"/assets/photo.jpg","hasNewTwiter":true,"banner":"/assets/friendcircle-banner.png"}]

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utility = __webpack_require__(0);

var _twiter = __webpack_require__(3);

var _twiter2 = _interopRequireDefault(_twiter);

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

var _twiters = __webpack_require__(5);

var _twiters2 = _interopRequireDefault(_twiters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = _user2.default && _user2.default.length ? _user2.default[0] : null;
if (!user) {
	throw 'Please login to continue.';
}

var frag = document.createDocumentFragment();

var card = (0, _utility.el)('div', ['card'], void 0, 'background-image: ' + user.banner);

var nickname = (0, _utility.el)('span', ['nickname']);
nickname.innerHTML = user.nickname;
card.appendChild(nickname);

var cls = ['avatar'];
if (user.hasNewTwiter) {
	cls.push('has-new-twiter');
}
var avatarContains = (0, _utility.el)('a', cls, {
	href: 'javascript: void 0;'
});
var avatar = (0, _utility.el)('img', void 0, {
	src: user.avatar
});
avatarContains.appendChild(avatar);

card.appendChild(avatarContains);

frag.appendChild(card);

// get latest twiters by ajax


var contains = (0, _utility.el)('ul', ['twiters']);
var ts = _twiter2.default.renderList(_twiters2.default);
contains.appendChild(ts);

frag.appendChild(contains);

function reScale() {
	var html = document.documentElement;
	var width = html.clientWidth;
	var fontSize = width / 375 * 100;

	html.style.fontSize = fontSize + 'px';
}

(0, _utility.addEvent)(window, 'orientationchange' in window ? 'orientationchange' : 'resize', reScale);
(0, _utility.addEvent)(document, 'DOMContentLoaded', reScale);
(0, _utility.addEvent)(window, 'load', function () {
	var loading = document.getElementById('loading');
	document.body.removeChild(loading);
	document.body.appendChild(frag);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(0);

var _user = __webpack_require__(1);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var user = _user2.default && _user2.default.length ? _user2.default[0] : null;
if (!user) {
	throw 'Please login';
}

var Twiter = function () {
	function Twiter(opt) {
		_classCallCheck(this, Twiter);

		new.target.ins.push(this);

		// 结构到对象属性

		var _ref = opt || {};

		this.id = _ref.id;
		this.uid = _ref.uid;
		this.nickname = _ref.nickname;
		this.avatar = _ref.avatar;
		this.content = _ref.content;
		var _ref$images = _ref.images;
		_ref$images = _ref$images === undefined ? [] : _ref$images;

		var _ref$images2 = _toArray(_ref$images);

		this.images = _ref$images2.slice(0);
		this.shareLinks = _ref.shareLinks;
		this.likes = _ref.likes;
		var _ref$hasLiked = _ref.hasLiked;
		this.hasLiked = _ref$hasLiked === undefined ? false : _ref$hasLiked;
		var _ref$comments = _ref.comments;
		_ref$comments = _ref$comments === undefined ? [] : _ref$comments;

		var _ref$comments2 = _toArray(_ref$comments);

		this.comments = _ref$comments2.slice(0);
		this.total = _ref.total;
		this.type = _ref.type;
		this.newsTime = _ref.newsTime;
	}

	_createClass(Twiter, [{
		key: 'renderAvatar',
		value: function renderAvatar() {
			return (0, _utility.el)('img', ['twiter-avatar'], {
				src: this.avatar
			});
		}
	}, {
		key: 'renderNickName',
		value: function renderNickName() {
			var nickname = (0, _utility.el)('div', ['twiter-nickname']);
			nickname.innerHTML = this.nickname + '';

			return nickname;
		}
	}, {
		key: 'renderContent',
		value: function renderContent() {
			var content = (0, _utility.el)('div', ['twiter-content']);
			content.innerHTML = this.content + '';

			return content;
		}
	}, {
		key: 'renderShareLinks',
		value: function renderShareLinks() {
			var contains = (0, _utility.el)('div', ['twiter-share-links']);
			contains.innerHTML = this.shareLinks;

			return contains;
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var images = (0, _utility.el)('div', ['twiter-images']);
			var num = this.images.length;

			if (num > 9) {
				this.images.length = 9;
			}

			if (num === 1) {
				var item = (0, _utility.el)('a', null, {
					href: 'javascript: void 0;'
				});

				var image = (0, _utility.el)('img', null, {
					src: this.images[0]
				});

				item.appendChild(image);

				images.appendChild(item);
			} else if (num === 2 || num === 4) {
				var row = null;

				this.images.forEach(function (url, key) {
					if (key % 2 === 0) {
						row = (0, _utility.el)('div', ['row']);
						images.appendChild(row);
					}

					var item = (0, _utility.el)('a', ['col-6'], {
						href: 'javascript: void 0;'
					});
					row.appendChild(item);

					var image = (0, _utility.el)('img', void 0, {
						src: url
					});
					item.appendChild(image);
				});
			} else if (num === 3 || num >= 6) {
				var _row = null;

				this.images.forEach(function (url, key) {
					if (key % 3 === 0) {
						_row = (0, _utility.el)('div', ['row']);
						images.appendChild(_row);
					}

					var item = (0, _utility.el)('a', ['col-4'], {
						href: 'javascript: void 0;'
					});
					_row.appendChild(item);

					var image = (0, _utility.el)('img', void 0, {
						src: url
					});
					item.appendChild(image);
				});
			}

			return images;
		}
	}, {
		key: 'renderButtons',
		value: function renderButtons() {
			var btn = (0, _utility.el)('div', ['twiter-btn']);

			var likes = (0, _utility.el)('a', ['twiter-btn-like'], {
				href: 'javascript: void 0;'
			});
			likes.innerHTML = this.likes ? this.likes : '赞';
			btn.appendChild(likes);

			var add = (0, _utility.el)('a', ['twiter-btn-add'], {
				href: 'javascript: void 0;'
			});
			add.innerHTML = '评论';
			btn.appendChild(add);

			if (this.uid === user.id) {
				var del = (0, _utility.el)('a', ['twiter-btn-delete'], {
					href: 'javascript: void 0;'
				});
				del.innerHTML = '删除';

				btn.appendChild(del);
			}

			return btn;
		}
	}, {
		key: 'renderNewsTime',
		value: function renderNewsTime() {
			var newsTime = (0, _utility.el)('div', ['twiter-newstime']);
			newsTime.innerHTML = (0, _utility.getNewsTime)(this.newsTime);

			return newsTime;
		}
	}, {
		key: 'renderCommentItem',
		value: function renderCommentItem(comment) {
			var item = (0, _utility.el)('li', ['twiter-comment']);

			var author = (0, _utility.el)('a', ['twiter-comment-author'], {
				href: 'javascript: void 0;'
			});
			author.innerHTML = comment.nickname;
			item.appendChild(author);

			if (comment.replyTo) {
				var mark = (0, _utility.el)('span', ['twiter-comment-reply-mark']);
				mark.innerHTML = '回复';
				item.appendChild(mark);

				var replyTo = (0, _utility.el)('a', ['twiter-comment-reply-to'], {
					href: 'javascript: void 0'
				});
				replyTo.innerHTML = comment.replayToNickname;
				item.appendChild(replyTo);
			}

			var content = (0, _utility.el)('a', ['twiter-comment-content'], {
				href: 'javascript: void 0'
			});
			content.innerHTML = '：' + comment.content;
			item.appendChild(content);

			return item;
		}
	}, {
		key: 'renderComments',
		value: function renderComments() {
			var _this = this;

			var comments = (0, _utility.el)('ul', ['twiter-comments', 'twiter-comments-collapse']);

			this.comments.forEach(function (comment, key) {
				var item = _this.renderCommentItem(comment);

				comments.appendChild(item);
			});

			if (this.total > this.comments.length) {
				var item = (0, _utility.el)('li', ['twiter-comment']);

				var tips = (0, _utility.el)('a', ['twiter-comments-tips'], {
					href: 'javascript: void 0;'
				});
				tips.innerHTML = '\u67E5\u770B\u5168\u90E8' + this.total + '\u6761\u8BC4\u8BBA';
				item.appendChild(tips);

				comments.appendChild(item);
			}

			return comments;
		}
	}, {
		key: 'render',
		value: function render() {
			if (!this.id) {
				return null;
			}

			var twiter = (0, _utility.el)('li', ['twiter']);

			twiter.appendChild(this.renderAvatar());

			var main = (0, _utility.el)('div', ['twiter-main']);
			twiter.appendChild(main);

			main.appendChild(this.renderNickName());
			main.appendChild(this.renderContent());

			if (this.shareLinks) {
				main.appendChild(this.renderShareLinks());
			}

			if (this.images && this.images.length) {
				main.appendChild(this.renderImages());
			}

			main.appendChild(this.renderButtons());
			main.appendChild(this.renderNewsTime());
			if (this.comments && this.comments.length) {
				main.appendChild(this.renderComments());
			}

			this.bindHandle(twiter);

			return twiter;
		}
	}, {
		key: 'bindHandle',
		value: function bindHandle(dom) {
			var self = this;

			(0, _utility.addEvent)(dom, 'click', function (e, target) {
				if (target.className.indexOf('twiter-btn-like') !== -1) {
					if (!self.hasLiked) {
						self.like(target);
					} else {
						self.unlike(target);
					}
				}

				if (target.className.indexOf('twiter-comments-tips') !== -1) {
					var parent = target.parentElement || target.parentNode;
					var contains = parent.parentElement || parent.parentNode;

					if (contains.className.indexOf('twiter-comments-expand') !== -1) {
						self.collapseComments(target);
					} else {
						self.expandComments(target);
					}
				}
			});
		}
	}, {
		key: 'like',
		value: function like(dom) {
			this.likes++;
			this.hasLiked = true;

			dom.innerHTML = this.likes;

			// update database by ajax
		}
	}, {
		key: 'unlike',
		value: function unlike(dom) {
			this.likes--;
			this.hasLiked = false;

			if (this.likes) {
				dom.innerHTML = this.likes;
			} else {
				dom.innerHTML = '赞';
			}

			// update database by ajax
		}
	}, {
		key: 'delete',
		value: function _delete() {
			//
		}
	}, {
		key: 'expandComments',
		value: function expandComments(dom) {
			var _this2 = this;

			if (!dom) {
				return false;
			}

			//get all comments by ajax
			var comments = __webpack_require__(4);

			// ajax callback function
			if (comments && comments.length) {
				this.total = comments.length;

				var parent = dom.parentElement || dom.parentNode;
				var contains = parent.parentElement || parent.parentNode;

				contains.className = 'twiter-comments twiter-comments-expand';

				var prevSibling = parent.previousElementSibling || parent.previousSibling;
				while (prevSibling !== null) {
					contains.removeChild(prevSibling);

					prevSibling = parent.previousElementSibling || parent.previousSibling;
				}

				var frag = document.createDocumentFragment();
				comments.forEach(function (comment, key) {
					var item = _this2.renderCommentItem(comment);
					frag.appendChild(item);
				});

				contains.insertBefore(frag, parent);
			}

			dom.innerHTML = '收起';
		}
	}, {
		key: 'collapseComments',
		value: function collapseComments(dom) {
			console.log('collapseComments');
			if (!dom) {
				return false;
			}

			var parent = dom.parentElement || dom.parentNode;
			var contains = parent.parentElement || parent.parentNode;

			contains.className = 'twiter-comments twiter-comments-collapse';

			var prevSibling = parent.previousElementSibling || parent.previousSibling;

			while (contains.childNodes.length > 4 && prevSibling !== null) {
				contains.removeChild(prevSibling);

				prevSibling = parent.previousElementSibling || parent.previousSibling;
			}

			dom.innerHTML = '\u67E5\u770B\u5168\u90E8' + this.total + '\u6761\u8BC4\u8BBA';
		}
	}], [{
		key: 'renderList',
		value: function renderList(twiters) {
			var frag = document.createDocumentFragment();

			if (twiters && twiters.length > 0) {
				twiters.forEach(function (twiter, key) {
					var t = new Twiter(twiter);

					frag.appendChild(t.render());
				});
			}

			var noMore = (0, _utility.el)('li', ['twiter']);

			var noMoreTips = (0, _utility.el)('span', ['twiter-tips']);
			noMoreTips.innerHTML = '已显示全部内容';

			noMore.appendChild(noMoreTips);

			frag.appendChild(noMore);

			return frag;
		}
	}]);

	return Twiter;
}();

Twiter.ins = [];

exports.default = Twiter;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = [{"id":3001,"uid":1001,"nickname":"星星点灯","content":"Hello word.","newstime":1500520701337},{"id":3002,"uid":1003,"nickname":"Just do IT.","content":"How are you?","newstime":1500520701337},{"id":3003,"uid":1002,"nickname":"甲壳虫","replyTo":1001,"replayToNickname":"星星点灯","content":"美国首次获准对华出口大米 双方谈判耗时十多年","newstime":1500520701337},{"id":3004,"uid":1001,"nickname":"星星点灯","replyTo":1002,"replayToNickname":"甲壳虫","content":"上海倒塌房屋现场已搜救出6人 4人抢救无效死亡","newstime":1500520701337},{"id":3005,"uid":1001,"nickname":"星星点灯","replyTo":1003,"replayToNickname":"Just do IT.","content":"中国花游队获首枚世锦赛金牌","newstime":1500520701337},{"id":3006,"uid":1001,"nickname":"星星点灯","replyTo":1002,"replayToNickname":"甲壳虫","content":"说的好","newstime":1500520701337}]

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = [{"id":2001,"uid":1001,"nickname":"星星点灯","avatar":"./assets/photo.jpg","content":"滴滴出行，出行无忧！","likes":0,"hasLiked":false,"total":0,"newsTime":1500520701337},{"id":2001,"uid":1002,"nickname":"凌度","avatar":"./assets/avatar.png","content":"滴滴出行，出行无忧！","shareLinks":"<a href='./static.html'><img src='./assets/avatar.png'><span>滴滴出行，出行无忧！</span</a>","likes":0,"hasLiked":false,"total":0,"newsTime":1500220701337},{"id":2001,"uid":1002,"nickname":"凌度","avatar":"./assets/avatar.png","content":"滴滴出行，出行无忧！","shareLinks":"<a href='./static.html'><img src='./assets/avatar.png'><span>滴滴出行，出行无忧！滴滴出行，出行无忧！滴滴出行，出行无忧！</span</a>","likes":0,"hasLiked":false,"total":0,"newsTime":1300520701337},{"id":2001,"uid":1002,"nickname":"凌度","avatar":"./assets/avatar.png","content":"滴滴出行，出行无忧！","images":["./assets/photo.jpg"],"likes":0,"hasLiked":false,"total":0,"newsTime":1500520701337},{"id":2001,"uid":1002,"nickname":"星星点灯","avatar":"./assets/photo.jpg","content":"滴滴出行，出行无忧！ by 星星点灯","images":["./assets/photo.jpg","./assets/photo.jpg","./assets/photo.jpg","./assets/photo.jpg","./assets/photo.jpg","./assets/photo.jpg"],"likes":2,"comments":[{"id":3001,"author":1003,"nickname":"星星点灯","content":"Hello word.","newsTime":1500520701337}],"total":6,"newsTime":1400520701337},{"id":2001,"uid":1002,"nickname":"甲壳虫","avatar":"./assets/avatar.png","content":"滴滴出行，出行无忧！ by 甲壳虫","images":["./assets/photo.jpg","./assets/photo.jpg","./assets/photo.jpg","./assets/photo.jpg"],"likes":99,"comments":[{"id":3001,"author":1003,"nickname":"星星点灯","replyTo":1002,"replayToNickname":"甲壳虫","content":"Hello word.","newsTime":1500520701337}],"total":16,"newsTime":1500500701337}]

/***/ })
/******/ ]);