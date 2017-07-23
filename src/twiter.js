import {el, getNewsTime, addEvent} from './utility.js';
import users from './user.json';

const user = users && users.length ? users[0] : null;
if(!user){
	throw 'Please login';
}

class Twiter{
	constructor(opt){
		new.target.ins.push(this);

		// 结构到对象属性
		({
			id: this.id,
			uid: this.uid,
			nickname: this.nickname,
			avatar: this.avatar,
			content: this.content,
			images: [...this.images] = [], // 结构数组：形成深拷贝，断开引用连接
			shareLinks: this.shareLinks,
			likes: this.likes,
			hasLiked: this.hasLiked = false,
			comments: [...this.comments] = [], // @todo: 成员需要再次结构
			total: this.total,
			type: this.type,
			newsTime: this.newsTime
		} = opt || {});
	}

	renderAvatar(){
		return el('img', ['twiter-avatar'], {
			src: this.avatar
		});
	}

	renderNickName(){
		const nickname = el('div', ['twiter-nickname']);
		nickname.innerHTML = this.nickname + '';

		return nickname;
	}

	renderContent(){
		const content = el('div', ['twiter-content']);
		content.innerHTML = this.content + '';

		return content;
	}

	renderShareLinks(){
		const contains = el('div', ['twiter-share-links']);
		contains.innerHTML = this.shareLinks;

		return contains;
	}

	renderImages(){
		const images = el('div', ['twiter-images']);
		const num = this.images.length;

		if(num > 9){
			this.images.length = 9;
		}

		if(num === 1){
			const item = el('a', null, {
				href: 'javascript: void 0;'
			});

			const image = el('img', null, {
				src: this.images[0]
			});

			item.appendChild(image);

			images.appendChild(item);
		} else if(num === 2 || num === 4){
			let row = null;

			this.images.forEach((url, key) => {
				if(key % 2 === 0){
					row = el('div', ['row']);
					images.appendChild(row);
				}

				const item = el('a', ['col-6'], {
					href: 'javascript: void 0;'
				});
				row.appendChild(item);

				const image = el('img', void 0, {
					src: url
				});
				item.appendChild(image);
			});
		} else if(num === 3 || num >= 6){
				let row = null;

				this.images.forEach((url, key) => {
					if(key % 3 === 0){
						row = el('div', ['row']);
						images.appendChild(row);
					}

					const item = el('a', ['col-4'], {
						href: 'javascript: void 0;'
					});
					row.appendChild(item);

					const image = el('img', void 0, {
						src: url
					});
					item.appendChild(image);
				})
		}

		return images;
	}

	renderButtons(){
		const btn = el('div', ['twiter-btn']);

		const likes= el('a', ['twiter-btn-like'], {
			href: 'javascript: void 0;'
		});
		likes.innerHTML = this.likes ? this.likes : '赞';
		btn.appendChild(likes);

		const add = el('a', ['twiter-btn-add'], {
			href: 'javascript: void 0;'
		});
		add.innerHTML = '评论';
		btn.appendChild(add);

		if(this.uid === user.id){
			const del = el('a', ['twiter-btn-delete'], {
				href: 'javascript: void 0;'
			});
			del.innerHTML = '删除';

			btn.appendChild(del);
		}

		return btn;
	}

	renderNewsTime(){
		const newsTime = el('div', ['twiter-newstime']);
		newsTime.innerHTML = getNewsTime(this.newsTime);

		return newsTime;
	}

	renderCommentItem(comment){
		const item = el('li', ['twiter-comment']);

		const author = el('a', ['twiter-comment-author'], {
			href: 'javascript: void 0;'
		});
		author.innerHTML = comment.nickname;
		item.appendChild(author);

		if(comment.replyTo){
			const mark = el('span', ['twiter-comment-reply-mark']);
			mark.innerHTML = '回复';
			item.appendChild(mark);

			const replyTo = el('a', ['twiter-comment-reply-to'], {
				href: 'javascript: void 0'
			});
			replyTo.innerHTML = comment.replayToNickname;
			item.appendChild(replyTo);
		}

		const content = el('a', ['twiter-comment-content'], {
			href: 'javascript: void 0'
		});
		content.innerHTML = '：' + comment.content;
		item.appendChild(content);

		return item;
	}

	renderComments(){
		const comments = el('ul', ['twiter-comments', 'twiter-comments-collapse']);

		this.comments.forEach((comment, key) => {
			let item = this.renderCommentItem(comment);

			comments.appendChild(item);
		});

		if(this.total > this.comments.length){
			const item = el('li', ['twiter-comment']);

			const tips = el('a', ['twiter-comments-tips'], {
				href: 'javascript: void 0;'
			});
			tips.innerHTML = `查看全部${this.total}条评论`;
			item.appendChild(tips);

			comments.appendChild(item);
		}

		return comments;
	}

	render(){
		if(!this.id){
			return null;
		}
		
		const twiter = el('li', ['twiter']);

		twiter.appendChild(this.renderAvatar());

		const main = el('div', ['twiter-main']);
		twiter.appendChild(main);

		main.appendChild(this.renderNickName());
		main.appendChild(this.renderContent());

		if(this.shareLinks){
			main.appendChild(this.renderShareLinks());
		}

		if(this.images && this.images.length){
			main.appendChild(this.renderImages());
		}

		main.appendChild(this.renderButtons());
		main.appendChild(this.renderNewsTime());
		if(this.comments && this.comments.length){
			main.appendChild(this.renderComments());
		}

		this.bindHandle(twiter);
		
		return twiter;
	}

	bindHandle(dom){
		const self = this;

		addEvent(dom, 'click', function(e, target){
			if(target.className.indexOf('twiter-btn-like') !== -1){
				if(!self.hasLiked){
					self.like(target);
				} else {
					self.unlike(target);
				}
			}

			if(target.className.indexOf('twiter-comments-tips') !== -1){
				const parent = target.parentElement || target.parentNode;
				const contains = parent.parentElement || parent.parentNode;

				if(contains.className.indexOf('twiter-comments-expand') !== -1){
					self.collapseComments(target);
				} else {
					self.expandComments(target);
				}
			}
		});
	}

	like(dom){
		this.likes++;
		this.hasLiked = true;
		
		dom.innerHTML = this.likes;

		// update database by ajax
	}

	unlike(dom){
		this.likes--;
		this.hasLiked = false;

		if(this.likes){
			dom.innerHTML = this.likes;
		} else {
			dom.innerHTML = '赞';
		}

		// update database by ajax
	}

	delete(){
		//
	}

	expandComments(dom){
		if(!dom){
			return false;
		}

		//get all comments by ajax
		const comments = require('./comments.json');

		// ajax callback function
		if(comments && comments.length){
			this.total = comments.length;

			const parent = dom.parentElement || dom.parentNode;
			const contains = parent.parentElement || parent.parentNode;

			contains.className = 'twiter-comments twiter-comments-expand';

			let prevSibling = parent.previousElementSibling || parent.previousSibling;
			while(prevSibling !== null){
				contains.removeChild(prevSibling);

				prevSibling = parent.previousElementSibling || parent.previousSibling;
			}

			const frag = document.createDocumentFragment();
			comments.forEach((comment, key) => {
				const item = this.renderCommentItem(comment);
				frag.appendChild(item);
			});

			contains.insertBefore(frag, parent);
		}

		dom.innerHTML = '收起';
	}

	collapseComments(dom){console.log('collapseComments')
		if(!dom){
			return false;
		}

		const parent = dom.parentElement || dom.parentNode;
		const contains = parent.parentElement || parent.parentNode;

		contains.className = 'twiter-comments twiter-comments-collapse';

		let prevSibling = parent.previousElementSibling || parent.previousSibling;

		while(contains.childNodes.length > 4 && prevSibling !== null){
			contains.removeChild(prevSibling);

			prevSibling = parent.previousElementSibling || parent.previousSibling;
		}

		dom.innerHTML = `查看全部${this.total}条评论`;
	}

	static renderList(twiters){
		const frag = document.createDocumentFragment();

		if(twiters && twiters.length > 0){
			twiters.forEach((twiter, key) => {
				const t = new Twiter(twiter);

				frag.appendChild(t.render());
			});
		}

		const noMore = el('li', ['twiter']);
		
		const noMoreTips = el('span', ['twiter-tips']);
		noMoreTips.innerHTML = '已显示全部内容';

		noMore.appendChild(noMoreTips);

		frag.appendChild(noMore);

		return frag;
	}
}

Twiter.ins = [];

export default Twiter;
