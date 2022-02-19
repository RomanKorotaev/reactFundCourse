
// Были установлены библиотеки: victory  и  lodash

import { VictoryBar,  VictoryChart , VictoryAxis, VictoryLabel, VictoryGroup  } from 'victory';
import OwnTheme from '../OwnTheme';
import db from '../db.json'


const MyDiogram = function () {

  //  console.log ( " db = ",  db);
  //  console.log ( " db.data = ",  db.data)


// Вынимаем из массива данных с транзакциями значения свойств sum, description. Записываем в новый массив объектов
// и передаём его  
   const dataForDiagram = db.data.map ( elem => {
    return {description: elem.description, sum: elem.sum}
  })

  // console.log ( " dataForDiagram = ",  dataForDiagram)

  //////////////////////////---------------------- ПРОБЛЕМА ДУБЛИРОВАНИЯ СУММ: РЕШЕНИЕ  И МОЙ ВАРИАНТ(НЕ СРАБОТАЛ)    НАЧАЛО . ---------------------------
  const changeInfo = array => {
    let result = [];
  
    for (let i = 0; i < array.length; i += 1) {
      if (!result.includes(array[i].description)) {
        result.push(array[i].description);
      }
    }
  
    result = result.map(el => {
      // console.log ('el => = ', el)
      return { description: el, sum: 0 };
    });

    let tm = [...result]

    // console.log ( 'tm : ', tm)
 
    for (let i = 0; i < array.length; i += 1) {
      const choseEl = result.find(el => el.description === array[i].description );
      choseEl.sum += array[i].sum;

      // const choseEl2 = tm.find(el => el.description === array[i].description );
      // choseEl2.sum += array[i].sum;
      // console.log ( ' + tm : ', tm)
    }
 
    return result;
  };

  const dataForDiagram2 =  changeInfo( db.data)

  // console.log ( " dataForDiagram2 ", dataForDiagram2 )

  

////////////  ------------- МОЙ ВАРИАНТ ----не сработало ---------------------------------------
let tmpArray = []

  for (let i=0; i<dataForDiagram.length; i++) {

    let newObj = {description:  dataForDiagram[i].description, sum:  dataForDiagram[i].sum }


                for (let k=i+1; k<dataForDiagram.length; k++) {
                    if (dataForDiagram[i].description!==dataForDiagram[k].description) {
                      // tmpArray.push(dataForDiagram[i])
                    } else {
                      newObj.sum = newObj.sum+dataForDiagram[k].sum
                    }
                }

                tmpArray.push(newObj)

  }

  // console.log (" tmpArray = ", tmpArray)

    //////////////////////////---------------------- ПРОБЛЕМА ДУБЛИРОВАНИЯ СУММ: РЕШЕНИЕ  И МОЙ ВАРИАНТ(НЕ СРАБОТАЛ)    КОНЕЦ . ---------------------------
  // Сортировка сумм от большей к меньшей
  dataForDiagram.sort ( (a, b) => b.sum-a.sum)

  dataForDiagram2.sort ( (a, b) => b.sum-a.sum)


  return (
      <div style = {{ textAlign: 'center', color: 'blue', border: '2px solid red', width: '200px'}}>

  <VictoryChart
    // добавляем свою кастомную тему диаграммы
    theme={OwnTheme}
    // domainPadding will add space to each side of VictoryBar to
    // prevent it from overlapping the axis
    domainPadding={10}
  
   >

   <VictoryAxis  // работает с данными по оси Х
     // tickValues specifies both the number of ticks and where
     // they are placed on the axis
    //  tickValues={[1, 2, 3, 4]} 
    dependAxis={true}
    style={{ data: { fill: "#dff515" } }}
     tickFormat={dataForDiagram2.map( elem=> elem.description)}  //Это подписи внизу диограммы к каждому столбцу
   />

   {/* <VictoryAxis // работает с данными по оси У. 
    //  dependentAxis
     // tickFormat specifies how ticks should be displayed
    //  tickFormat={(x) => (`$${x / 1000}k`)}
     style={{ data: { fill: "#FF751D" } }}
   /> */}


     <VictoryBar

       data={dataForDiagram2}

       barRatio={0.6}
       cornerRadius={{ top:  5 }}
       // data accessor for x values
       x="description"
       // data accessor for y values
       y="sum"
      
       labels={dataForDiagram2.map( elem=> `${elem.sum} грн.`) }
       style={{ data: { fill: "#FF751D"  } }}

          events={[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [
                  {
                    target: "data",
                    mutation: (props) => {
                      const fill = props.style && props.style.fill;
                      return fill === "#F5F6FB" ? null : { style: { fill: "#F5F6FB", stroke: "#FF751D", strokeWidth: 1} };
                    }
                  }
                ];
              }
            }
          }]}

       animate={{
        duration: 2000,
        onLoad: { duration:1000 }
      }}

        //для мобильной версии - горизонтальное отображение
        // horizontal
        // labelComponent={<VictoryLabel dy={-25} dx={0}/>}

     />

    </VictoryChart>

  </div>
 )
 
}

export default MyDiogram

//<section className={s.expensesDiargBg}>{/* <Diargam /> */}</section>