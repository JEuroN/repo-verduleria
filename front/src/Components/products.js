import React, {useEffect, useState} from 'react';
import axios from 'axios';
import port from '../port';
import cart from '../Assets/shopping-cart-16.png'
import ShopCart from './shopcart'
import '../App.css'

const Product = () => {
    
    const [fruits, setFruits] = useState([]);

    const [filter, setFilter] = useState('');

    const [list, setList] = useState([]);

    const [tab, setTab] = useState(true);

    useEffect(() => {
        getFruit();
    }, []);

    const reset = () => {
        setTab(true);
        setList([]);
        getFruit();
    }

    const getFruit = () => {
        axios.get(port + '/getFruit')
        .then(r => {
            console.log(r);
            setFruits(r.data.msg);
        })
        .catch(r => {
            console.log(r);
        })
    }

    useEffect(()=>{
        console.log(list);
    }, [list])


    const search = fruits.map((fruit, index) => {
        const {list_id, list_categoria, list_precio, list_stock, list_descripcion, list_img, list_name} = fruit; 
        if(list_name.toLowerCase().includes(filter.toLowerCase()) === true){
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
                    </div>
                    <img src={cart} alt='cart' className='icon' onClick={()=>{select(list_id)}}/>
                </div>
            )
        }else
            return null;
    })

    const makeShopCart = (fruit) => {
        let exist = list.findIndex(item => item.list_name === fruit.list_name);
        
        if(exist === -1 ){
            setList([...list, {list_name: fruit.list_name, list_precio: fruit.list_precio, list_id: fruit.list_id, list_descripcion: fruit.list_descripcion, list_cantidad: 1, list_stock: fruit.list_stock, list_img: fruit.list_img}])
        }else{
            let newArray = [...list];
            let Arr = {...newArray[exist]};
            Arr.list_cantidad += 1;
            newArray[exist] = Arr;
            setList(newArray);
        }
    }

    const select = (id) =>{
        let filter = fruits.filter(fruit =>{
            return fruit.list_id === id
        })
        makeShopCart(filter[0]);
    }

    return ( 
    <div className='card-Container'>
        <div className='header'>
            <input placeholder='Busqueda' onChange={(e)=>{setFilter(e.target.value)}}></input>
            <button onClick={()=>{setTab(!tab)}}>Ir al carrito</button>
        </div>
        {tab ? search : null}
        {tab ? null : <ShopCart fruits={list} setList={setList} reset={reset} />}
    </div> 
    );
}
 
export default Product;

