import React, { useEffect, useState } from 'react'
import Card from './Card';


function Home() {

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState([]);

    const fetchData = () => {
        fetch("https://api.hatchways.io/assessment/students")
            .then((data) => data.json())
            .then((data) => {
                data = data.students
                data.forEach((student) => {
                    if (!student.tags) {
                        Object.assign(student, { tags: [] });
                    }
                });
                setUsers(data)
                setTotalUsers(data)
                console.log(data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleInputFilter = (e) => {
        if (e.target.value == null) {
            setUsers(totalUsers);
        } else {
            const filtered = totalUsers.filter(
                item => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    (item.firstName + " " + item.lastName).toLowerCase().includes(e.target.value.toLowerCase()))
            setUsers(filtered)
        }
    }

    const handleTagFilter = (e) => {
        if (e.target.value == null) {
            setUsers(totalUsers);
        } else {
            const filtered = totalUsers.filter((user) => {
                let tagAdded = false;
                user.tags.forEach(
                    (tag) => {
                        if (e.target.value.toLowerCase().includes(tag.toLowerCase())) {
                            tagAdded = true;
                        }
                    }
                )
                return tagAdded;
            }
            )
            setUsers(filtered);
        }
    }



    return (

        <div className="d-flex align-items-center justify-content-center ">

            <div className="card scollable-card">

                <div className="sticky">
                    <input type="text" className='input-field '
                        placeholder='Search by name' width="500px"
                        onInput={(e) => handleInputFilter(e)}
                    />
                </div>

                <div className="sticky">
                    <input type="text" className='input-field'
                        placeholder='Search by tag' width="500px"
                        onInput={(e) => handleTagFilter(e)}
                    />
                </div>

                {users.map((currentUser) => {
                    return (
                        <div key={currentUser.id}>
                            <Card currentUser={currentUser} />
                        </div>
                    )
                })
                }

            </div>

        </div>

    );
}

export default Home