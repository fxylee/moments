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
function el(tag, cls, attr, style){
	if(!tag){
		throw 'tagName is empty';
	}

	const t = document.createElement(tag);

	// @todo
	if(attr){
		for(let key in attr){
			if(attr.hasOwnProperty(key)) {
				t.setAttribute(key, attr[key]);
			}
		}
	}

	if(cls && cls.length){
		t.className = cls.join(' ');
	}

	if(style){
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
function getNewsTime(date){
	date = date ? new Date(date) : new Date();
	const now = new Date();

	const diff = {};
	diff.year = now.getYear() - date.getYear();
	diff.date = now.getDate() - date.getDate();
	diff.hour = now.getHours() - date.getHours();
	// diff.minute = now .getMinutes() - date.getMinutes();

	if(diff.year > 1){
		return '很早以前';
	}

	let n = '';
	if(diff.date < 1){
		if(diff.hour < 1){
			n = '刚刚';
		} else {
			n = diff.hour + '小时前';
		}
	} else if(diff.date === 1){
		n = '昨天';
	} else if(diff.date > 15) {
		n = '半个月前';
	} else {
		n = diff.date + '天前'
	}

	return n;
}

function addEvent(dom, event, handle, useCapture){
	useCapture = !!useCapture;

	if(document.addEventListener){
		dom.addEventListener(event, function(e){
			e = e || window.event;
			const target = e.target || e.srcElement;

			handle.call(this, e, target);
		}, useCapture);
	}

	if(document.attachEvent){
		dom.attachEvent('on' + event, function(e){
			e = e || window.event;
			const target = e.target || e.srcElement;

			handle.call(this, e, target);
		}, useCapture)
	}
}

// export {el: el, getNewsTime: getNewsTime};
module.exports = {
	el: el,
	getNewsTime: getNewsTime,
	addEvent: addEvent
};

