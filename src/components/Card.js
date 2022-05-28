import React, { useEffect, useState } from 'react';


function Card({ currentUser }) {
  const [show, setShow] = useState(false);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setTag('');
      currentUser.tags.push(e.target.value);
      setTags(currentUser.tags);
    }
  }

  return (

    <div className="p-3 row" key={currentUser.id}>

      <div className="circle-img col-lg-2 col-md-2 col-sm-2">
        <img src={currentUser.pic} />
      </div>

      <div className="col-lg-8 col-md-8 col-sm-8">
        <h1><strong>{currentUser.firstName} {currentUser.lastName}</strong> </h1>
        <div><span>Email: </span><span>{currentUser.email}</span></div>
        <div><span>Company: </span><span>{currentUser.company}</span></div>
        <div><span>Skills: </span><span>{currentUser.skill}</span></div>
        <div><span>Average: </span><span>{currentUser.grades.reduce((a, b) => {
          return parseInt(a) + parseInt(b);
        }, 0) / 8
        }%</span></div>


        <div>
          {
            tags.map((t) => {
              return (
                <span className='p-1 main-span' key={t}>
                  <span className="boxed">{t}</span>
                </span>
              )
            })
          }


          <br />
          <input type="text" placeholder="Add a tag" className="tag-input"
            onKeyPress={(e) => addTag(e)} name="tag" value={tag}
            onChange={((e) => setTag(e.target.value))}
          />
        </div>

        <br />

        {show &&
          <div className="collapsible">
            <div><span>Test 1: </span><span>{currentUser.grades[0]}</span></div>
            <div><span>Test 2: </span><span>{currentUser.grades[1]}</span></div>
            <div><span>Test 3: </span><span>{currentUser.grades[2]}</span></div>
            <div><span>Test 4: </span><span>{currentUser.grades[3]}</span></div>
            <div><span>Test 5: </span><span>{currentUser.grades[4]}</span></div>
            <div><span>Test 6: </span><span>{currentUser.grades[5]}</span></div>
            <div><span>Test 7: </span><span>{currentUser.grades[6]}</span></div>
            <div><span>Test 8: </span><span>{currentUser.grades[7]}</span></div>
          </div>
        }
      </div>

      <div className="float-right col-lg-1 col-md-1 col-sm-1">
        {
          show ?
            <i className="fa fa-minus toggle" onClick={() => setShow(!show)}></i>
            :
            <i className="fa fa-plus toggle" onClick={() => setShow(!show)}></i>
        }
      </div>



    </div>
  )

}

export default Card