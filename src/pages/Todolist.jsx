import React, { useEffect, useState } from 'react'
import {v4} from 'uuid'
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable'

const Todolist = () => {
    const [item, setItem] = useState('') // element state
    const [items, setItems] = useState(   //Array of elemens state
        JSON.parse(localStorage.getItem('items')) || []
    )

    useEffect(() => {
        localStorage.getItem('items', JSON.stringify(items))
    }, [items]) // Array of All Elements

    const newItem = () => {
        if(item.trim() !== '') {
            const newItem = {
                id: v4(), //asign id number to item
                item,
                color: randomColor({
                    luminosity: 'light'
                }),
                defaultPos: {
                    x: 500,
                    y: -500
                }
            }
        setItems((items) => [...items, newItem]) // taking all elements and addind one more
        setItem('') // clear input
        } else {
            alert('Insert Something')
            setItem('') // clear input
        }
    }
    const deleteItem = (id) => {   
        setItems(items.filter((item) => item.id !== id))
    }
    const updatePos = (data, index) => { // save position function
        let newArray = [...items]
        newArray[index].defaultPos = { x:data.x, y:data.y }
        setItems(newArray)
    }
    const keyPress = (e) => {
        const code = e.keyCode || e.which 
        if(code === 13){
             newItem()
        }
    }

    return (
        <>
        <div className='wrapper'>
            <input
                type="text"
                value={item} //important for delete method
                placeholder='Insert something to do'
                onChange={(e) => setItem(e.target.value)} //insp el.-> Netwotk: target and value
                onKeyPress={(e) => keyPress(e)}
            />
            <button 
                className='submit'
                onClick={newItem}
            >Submit</button>
        </div>
        {items.map((item, index) => {
            return (
                <Draggable 
                    key={index} 
                    defaultPosition={item.defaultPos}
                    onStop={(_, data) => {
                        updatePos(data, index)
                    }}
                >
                    <div 
                        className='todoItem' 
                        style={{backgroundColor: item.color}}
                    >
                            {`${item.item}`}
                            <button 
                                className='delete'
                                onClick={() => deleteItem(item.id)}
                            >Ha-Xyu</button>
                    </div>

                </Draggable>
            )
        })}
        </>
        
    )
}

export default Todolist
