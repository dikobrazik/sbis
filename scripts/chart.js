class Chart{
   constructor(container){
      this.container = container
      this.dataSet = [] 
      this.sorted = true
   }
   /**
    * 
    * @param {Number} min - нижняя граница 
    * @param {Number} max - верхняя граница
    * 
    * метод генерирует данные для сортировки
    */
   generateData(min, max){
      var random = (min, max) => Math.floor(Math.random() * (+max - +min)) + +min;
      for(let i = 0 ; i < 10; i++){
         this.add(random(min, max))
      }
   }
   /**
    * 
    * @param {Number} value - сортируемое значение
    * 
    * данный метод добавляет значение в график и записывает его в массив 
    */
   add(value){
      this.dataSet.push(value)
      let emptyDiv = this.container.appendChild(document.createElement('div'))
      emptyDiv.appendChild(document.createElement('i'))
      let div = emptyDiv.appendChild(document.createElement('div'))
      div.classList.add('stage')
      div.style.height = value + 'px'
      div.innerHTML = `<p style="padding-top:${value}px">${value}</p>`
   }
   /**
    * Итерация
    */
   iterate(max){
      return new Promise(async resolve =>{
         let numbers = this.dataSet
         this.sorted = true
         for(let i = 0 ; i < max; i++){
               if(numbers[i]> numbers[i+1]) this.sorted = false
               await this.swap(i, i+1, numbers[i]> numbers[i+1])
         }
         resolve()
      })
   }
   /**
    * Метод сортировки данных
    */
   async sort(){
      this.isSorting = true
      for(let i = this.dataSet.length -1 ; i > 0 ; i--){
         await this.iterate(i)
         setBackgroundColor('rgb(137, 137, 136)',this.container.children[i])
         if(this.sorted){
               for(let j = this.dataSet.length -1 ; j > 0 ; j--){
                  setBackgroundColor('#ffeb3b',this.container.children[j])
               }
               return
         } 
      }
      this.isSorting = false
   }
   /**
    * Метод очистки данных
    */
   clear(){
      this.dataSet = [] 
      this.container.innerHTML = ''
      this.isSorting = false
   }
   /**
    * 
    * @param {Number} firstElementIndex - индекс первого элемента 
    * @param {Number} secondElementIndex - индекс второго элемента
    * 
    * результатом данного метода будет смена местами элементов блока
    */
   swap(firstElementIndex, secondElementIndex, isChange){
      return new Promise(resolve =>{
         let firstNode = this.container.children[firstElementIndex]
         let secondNode = this.container.children[secondElementIndex]
         firstNode.getElementsByTagName('i')[0].classList.add('icon', 'slide-bottom')
         secondNode.getElementsByTagName('i')[0].classList.add('icon', 'slide-bottom')
         if(isChange){
               setTimeout(()=>{
                  firstNode.classList.add('slide-right')
                  secondNode.classList.add('slide-left')
                  setBackgroundColor('#ff0000', firstNode, secondNode)
                  this.dataSet[firstElementIndex] = [this.dataSet[secondElementIndex], this.dataSet[secondElementIndex] = this.dataSet[firstElementIndex]][0];
                  setTimeout(()=>{
                     firstNode.getElementsByTagName('i')[0].classList.remove('icon', 'slide-bottom')
                     secondNode.getElementsByTagName('i')[0].classList.remove('icon', 'slide-bottom')
                     setBackgroundColor('#ffeb3b', firstNode, secondNode)
                     firstNode.classList.remove('slide-right')
                     secondNode.classList.remove('slide-left')
                     swapDiv(secondNode)
                     resolve();
                  }, 500)
               },700)
         }else{
               setTimeout(()=>{
                  setBackgroundColor('#00ff8a', firstNode, secondNode)
                  setTimeout(()=>{
                     setBackgroundColor('#ffeb3b', firstNode, secondNode)
                     firstNode.getElementsByTagName('i')[0].classList.remove('icon', 'slide-bottom')
                     secondNode.getElementsByTagName('i')[0].classList.remove('icon', 'slide-bottom')
                     resolve();
                  }, 500)
               },700)
         }
      })
   }
}

/**
 * 
 * @param {Node} secondNode - второй элемент для замены
 * 
 * результат данной функции - переданный элемент переместится на место предыдущего 
 */
function swapDiv(secondNode){
    secondNode.parentNode.insertBefore(secondNode.cloneNode(true), secondNode.previousElementSibling)
    secondNode.remove()
}
/**
 * 
 * @param {Color} color - цвет фона который будет установлен в переданных нодах
 * @param  {NodeElements} nodes - ноды в которых необходимо поменять цвет фона 
 */
var setBackgroundColor = (color, ...nodes)=>nodes.map(v=>v.querySelector('div').style.backgroundColor = color)