// import { Card, CardHeader, Head } from '@nextui-org/react'
import React, { useState } from 'react';
// import { useForm, submitHandler } from 'react-hook-form'

const steps = [
  {
    id: 'Step 1',
    name: "catagory type", 
    fields: ['selectMasterCatagory', 'CatagoryName']
  },
  {
    id: 'Step 2',
    name: 'Add Dish',
    fields: ['addDish', 'description','price']
  },
  { id: 'Step 3', name: 'Add Photo', fields: ['addPhoto'] }
];
const Step1 = ({state, setState}) => {
 const [currentStep, setCurrentStep] = useState(0);
 const [display, setDisplay] = useState(false);

 const next =()=>{
   console.log(currentStep);
  if (currentStep < steps.length - 1) {
    setCurrentStep(step=>step+1);
    
  }
 }

 const prev =()=>{
  if (currentStep > 0) {
    setCurrentStep(step=>step-1);
  }
 }






  return (  
    <>
      <div className="max-w-lg mx-auto mt-20 p-8 rounded-lg shadow-lg bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-black rounded-t-lg"></div>
      
      <h2 className="text-2xl font-bold mb-2">Let's start by creating the categories of your menu</h2>
      <p className="text-gray-500 mb-6">Categories allow customers to navigate your menu in the app</p>

      <div className="flex items-center mb-4">
        <div className='font-bold border-1 border-gray-100 p-3 w-[30rem] rounded-lg shadow-md flex gap-2  items-center justify-between'>
          <p className=''>Add menu catagories</p>
        <button
          className="text-black rounded-3xl  hover:bg-gray-200 p-1 px-3"
        onClick={()=>setDisplay(!display)}
        >
          +
        </button>
        <form>
          {(display || currentStep === 0) &&(
            <>
            <label htmlFor="Select-Master-Catagory">select Master Catagory</label>
            <div>
              <select
                name="selectMasterCatagory"
                id="selectMasterCatagory"
                className="border-1 border-gray-100 p-3 w-full rounded-lg shadow-md"
              >
                <option value="">Select Master Catagory</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </select>
              <input type="text" placeholder="Catagory Name*" />
               {/* <div className='font-normal gap-2 flex items-baseline justify-self-end'>
        <button className='text-black p-3 rounded-lg shadow-lg'>Cancel</button>
        <button className='text-black p-3 rounded-lg shadow-lg'>Save</button>
        </div> */}
            </div>
            </>
          )}
          {currentStep === 1 &&(
            <>
            <label htmlFor="">Add Dish</label>
            <input type="text" name={steps[1].name} id={steps[1].id} placeholder={steps.fields[0]} />
            <input type="text" name={steps[1].name} id={steps[1].id} placeholder={steps.fields[1]} />
            <label htmlFor="price-validation">{steps.fields[2]}</label>
            <input type="text" name={steps[1].name} id={steps[1].id} placeholder={steps.fields[2]} />
            
            </>
          )}
          {currentStep === 2 &&(
            <>
            <label htmlFor="">Add Photo</label>
            <input type="file" />
            </>

          )}
        </form>
       
        </div>
      </div>

     
      <div className="flex justify-between items-center mt-8">
        <button className=" hover:text-black font-semibold text-black"
        onClick={()=>prev()}
        >Back</button>
        <p className="text-gray-600">4 steps to complete</p>
        <button className="bg-gray-100 text-black px-6 py-2 rounded-lg hover:bg-black hover:text-white"
        onClick={()=>next()}
        >
          Continue
        </button>
      </div>
    </div>
  


    </>
  )
}


// import { useState } from "react"

// const CategoryForm = ({state, setState}) => {
//     return (
//     <>
//     <h1>categoru form</h1>
//     <button onClick={()=>setState({...state,categorySubmission:true})}>Continue</button>
//     </>
//     )

// }

// const Itemform = () => {
//     return <h1>item foem</h1>
// }

// const Menu = () => {
//     const [state, resetState ] = useState({
//         categorySubmission : false,
//     })
//     if(state.categorySubmission===true)
//     return <Itemform />

//     return <CategoryForm state={state} setState={resetState}/>
// }

// export default Menu

export default function Menu() {
  const [state, resetState]=useState({
    catagorysubmission: false
  })
  
  if(state.catagorysubmission===true)
  return <item />

  return <Step1 state={state} setState={resetState}/>
}