import React, { useEffect, useState } from "react";
import "./App.css";

function User() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cms, setCms] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => e.preventDefault();

  const getData = () => {
    fetch(`https://api-generator.retool.com/bweBRk/data`, {
      method: "GET",
    })
      .then((rawData) => rawData.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  const deleteData = (id) => {
    fetch(`https://api-generator.retool.com/bweBRk/data/${id}`, {
      method: "DELETE",
    }).then(() => {
      getData();
    });
  };

  const addData = () => {
    const newData = { name, cms, age };

    fetch(`https://api-generator.retool.com/bweBRk/data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((rawData) => rawData.json())
      .then((jsonData) => {
        console.log("new data added successfully", jsonData);
        getData();
      });
  };

  const selectData = (id) => {
    const filterData = data.find((item) => item.id === id);
    console.log("selected data ", filterData);

    setId(filterData.id);
    setName(filterData.name);
    setCms(filterData.cms);
    setAge(filterData.age);
  };

  const updateData = (id) => {
    console.log("updated id ", id);
    console.log("updated data ", { name, cms, age });

    fetch(`https://api-generator.retool.com/bweBRk/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, cms, age }),
    }).then(() => {
      getData();
      console.log("update student data seccessfully");
    });
  };

  const clearData = () => {
    setId("");
    setName("");
    setCms("");
    setAge("");
  };

  return (
    <>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Cms</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.cms}</td>
                <td>{item.age}</td>
                <td>
                  <button
                    onClick={() => {
                      selectData(item.id);
                    }}
                  >
                    Select
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteData(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form
        onSubmit={handleSubmit}
        style={{ marginLeft: "400px", marginTop: "-900px" }}
      >
        <h1>Student Management System </h1>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="id"
          disabled={true}
        />
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <br />
        <input
          type="text"
          value={cms}
          onChange={(e) => setCms(e.target.value)}
          placeholder="cms"
        />
        <br />
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="age"
        />
        <br />
        <br />
        <button onClick={() => addData()}>Add new student</button> &nbsp;
        <button onClick={() => updateData(id)}>update student</button> &nbsp;
        <button onClick={() => clearData()}>clear</button>
      </form>
    </>
  );
}

export default User;