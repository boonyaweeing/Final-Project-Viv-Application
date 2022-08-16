import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./EditAct.css"
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import Swal from "sweetalert2";

const EditAct = () => {

  const [state, setState] = useState([]);

  //For format date to yyyy-mm-dd
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-')
  )}

  const newDate = formatDate(new Date(state.date));
  
  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  //Receive id which pass from router
  const { id } = useParams();
  console.log(id)
  //Get each data from id
  useEffect(()=>{
    axios.get(`http://localhost:8080/activities/show/${id}`)
    .then((res) => {
      const {ActType,hour,minute,date,description } = res.data
      setState({...state,ActType,hour,minute,date,description })
    })
  },[])

  // Set value to each fields
  useEffect(()=>{
    if(state) {
      reset({
        ActType: state.ActType,
        hour: state.hour,
        minute: state.minute,
        date: newDate,
        description: state.description
      });
    }
  }, [state])

  //When submit data patch each data
  const onSubmit = (data) => {
    console.log(data)
    axios
    .patch(`http://localhost:8080/activities/${id}`, data, { headers: { 'Content-Type': 'application/json' }})
    .then((res) => {
      console.log(res.data)
      //popup to show it been save
      Swal.fire(
          'Great!',
          'Your data had been edited.',
          'success',
      )
    .then(()=> document.addEventListener("click", window.location = "/"))
    })
    .catch((err) => {
        //popup to show if error
        Swal.fire(
            'Sorry for a problem!',
            err.response.data.error,
            'error'
        )
    })
  };

  return (
<div>
    <div className="bigBox2">
      <form id="form2" onSubmit={handleSubmit(onSubmit)}>
        <div className="type2">
          <h2>Type activity : </h2>
          <select {...register("ActType", { required: true }) }>
            <option value="">---- Select your activity ----</option>
            <option value="Running">Running  🏃</option>
            <option value="Swimming">Swimming  🏊🏻‍♂️</option>
            <option value="Hiking">Hiking  🌲👨🏻‍🦯</option>
            <option value="Riding bicycle">Riding bicycle  🚴🏻‍♂️</option>
            <option value="Walking">Walking  🚶</option>
          </select>
          {errors.ActType && <p>Type is required</p>}
        </div>

        <div className="type2">
          <h2>Duration : </h2>
          <div className="boxDu2">
            <input type="number" min="0" max="24"{...register("hour", { required: true })} />
            {errors.hour && <p>Hour is required</p>}
            <h3>Hours</h3>
            <input type="number" min="0" max="59"{...register("minute", { required: true })} />
            {errors.minute && <p>Minutes is required</p>}
            <h3>Minutes</h3>
          </div>
        </div>

        <div className="calendar2">
          <h2>Date : </h2>
          <input type="date" {...register("date", { required: true})} />
            {errors.date && <p>Date is required</p>}
        </div>

        <div className="type3">
          <h2>Description</h2>
          <textarea {...register("description")}  />
        </div>

        <div className="btn2">
        <input type="submit" value="Edit" />
        <Link to="/" ><input type="submit" value="Cancel" /></Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default EditAct;