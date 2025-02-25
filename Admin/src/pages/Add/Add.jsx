import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

    // to store the uploaded image
    const [image, setImage] = useState(false)
    // to store the details uploaded by the admin
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad" // default category
    })

    // function to setData in the state on change of input fields
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // setting the data in the state using setData by spreading the previous data and updating the new data through name and value
        setData(data=>({...data, [name]: value}))
    }

    // to check the data beign updated in the state
    useEffect(()=>{
        console.log(data)
    },[data])

    const onSubmitHandler = async (event) => {
        // to stop the page from being reloaded on submit
        event.preventDefault();

        // creating a form data to send the image and data to the server
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price)) // converting the string to number
        formData.append("category",data.category)
        formData.append("image",image)

        // sending the data to the server
        const response = await axios.post(`${url}/api/food/add`,formData)
        if (response.data.success) {
            // reset the form
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false);
            // if the data is successfully added to the database then send a toast message to the user
            toast.success(response.data.message)
        }
        else {
            // if the data is not added to the database then give a toast message to the user
            toast.error(response.data.message)
        }
    }

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                {/* if image is uploaded then show the image by creating a url of that image from image state else show the default image */}
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹199' />
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
