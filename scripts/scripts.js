const chart = new Chart(document.querySelector('div.container:nth-child(2)'))
document.addEventListener('DOMContentLoaded', ()=>{
	document.getElementById('start').style.maxWidth = document.getElementsByClassName('input')[0].clientWidth + document.getElementById('add').clientWidth + 'px';
})

document.querySelector('#help').addEventListener('click', ()=>{
	document.querySelector('.modal').style.display = "block";
	document.getElementsByClassName("modal-content")[0].style.height = (document.getElementsByTagName('img')[0].clientHeight+20)+ 'px';
	window.onclick = function(event) {
		if (event.target == document.getElementById("myModal")) {
			document.getElementById("myModal").style.display = "none";
		}
	  }
})
document.querySelector('#close').addEventListener('click', ()=>{
	document.getElementById("myModal").style.display = "none";	
})
document.querySelector('#add').addEventListener('click', ()=>{
	if(chart.isSorting) return
	value = document.querySelector('#values').value.replace(/\s/g, '')
	if(value == '') return
	if(value.indexOf(',') === -1){
		chart.add(value)
	}else{
		values = value.split(',')
		for(let i = 0 ; i < values.length; i++){
			chart.add(values[i])
		}
	}
})
document.querySelector('#values').addEventListener('keypress', (e)=>{
	var theEvent = e || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\,/;
	if( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
})
document.querySelector('#start').addEventListener('click', ()=>{
	chart.sort()
})
document.querySelector('#clear').addEventListener('click', ()=>{
	chart.clear()
})
document.querySelector('#generate').addEventListener('click', ()=>{
	if(chart.isSorting) return
	chart.generateData(1,100)
})