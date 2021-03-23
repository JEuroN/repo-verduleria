import React, {useState} from 'react';
import axios from 'axios';
import '../App.css'
import cancel from '../Assets/cancel.png'
import port from '../port';

const ShopCart = ({fruits, setList, reset}) => {

    const [good, isGood] = useState(true);

    const handleCompra = () => {
        const flag = fruits.filter(fruit => {
            return fruit.list_stock < fruit.list_cantidad
        })
        if(flag.length > 0){
            isGood(false)
        }else{
            isGood(true);
            axios(port + '/makeSale', {
                method: 'POST',
                data: fruits,
                headers: {"Content-Type": "application/json"}
            })
            .then((r)=>{
                console.log(r);
                reset();
            })
            .catch((r)=>{
                console.log(r);
            })
        }
    }

    const erase = (key) => {
        let filter = fruits.filter(fruits => {
            if(fruits.list_id !== key)
                return fruits
            else{
                if(fruits.list_cantidad > 1){
                    fruits.list_cantidad --;
                    return fruits;
                }
            }
        })
        setList(filter);
     }

    const cards = fruits.map((fruit, index) => {
        const {list_id, list_categoria, list_precio, list_stock, list_descripcion, list_img, list_name, list_cantidad} = fruit; 
        return(
            <div key={list_id} className='card'>
                <img src={list_img} alt='fruit'/>
                <div className='descrip'>
                    <h2>{list_name}</h2>
                    <p>{list_descripcion}</p>
                </div>
                <div style={{textTransform: 'capitalize'}}>
                    <h4>{list_categoria}</h4>
                    <h4>Precio: {list_precio}$</h4>
                    <h4>Stock: {list_stock}</h4>
                    <h4>Cantidad: {list_cantidad}</h4>
                </div>
                <img src={cancel} alt='cart' className='icon' onClick={()=>{erase(list_id)}}/>
            </div>
        )
    })

    return ( 
        <div>
            {good ? <h2>Todo correcto</h2> : <h2>Al parecer no hay suficiente de un producto</h2>}
            <button onClick={handleCompra}>Procesar compra</button>
            {cards}
        </div>
     );
}
 
export default ShopCart;