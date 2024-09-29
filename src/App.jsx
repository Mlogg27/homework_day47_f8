import { useState, useEffect } from 'react';
import { v4 } from "uuid"; 
import FCommontable from './components/CommonTable/index.jsx';
import "./App.css"

function App() {
    const getUsersFromLocalStorage = () => {
        const storedUsers = localStorage.getItem("users");
        return storedUsers ? JSON.parse(storedUsers) : [{
            ID: v4(),
            Name: "Long",
            Age: "20",
            Address: "Bạch Đằng",
            Gender: "Male",
        }];
    };
    const columns = [
        "ID",
        "Name",
        "Age",
        "Address",
        "Gender",
        "Action"
    ];

    const [user, setUser] = useState({
        ID: v4(),
        Name: "",
        Age: "",
        Address: "",
        Gender: "",
    });

    const [users, setUsers] = useState(getUsersFromLocalStorage);
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    const onInput = (e, key) => {
        const updateUser = { ...user }; 
        updateUser[key] = e.target.value; 
        setUser(updateUser); 
    };

    const handleSave = () => {
        const nameInput = document.querySelector("#name");
        const ageInput = document.querySelector("#age");
        const addressInput = document.querySelector("#address");
        const selectEl = document.querySelector('select');
    
        if (!nameInput.value || !addressInput.value || !ageInput.value || !selectEl.value) {
            alert("Vui lòng điền đầy đủ các trường thông tin!");
            return;
        }

        if(Number(ageInput.value)<=0){
            alert("Tuổi không hợp lệ!")
            ageInput.value="";
            return;
        }

        const existingUserIndex = users.findIndex(u => u.ID === user.ID);

        if (existingUserIndex !== -1) {
            const updatedUsers = [...users];
            updatedUsers[existingUserIndex] = user; 
            setUsers(updatedUsers);
        } else {
            setUsers(prevUsers => [...prevUsers, user]);
        }

        setUser({
            ID: v4(), 
            Name: '',
            Age: '',
            Gender: '',
            Address: ''
        });

        nameInput.value = "";
        ageInput.value = "";
        addressInput.value = "";
        selectEl.value = "";
    };

    const handleEdit = (editId) => {
        const selectedUser = users.find(user => user.ID === editId);
        if (selectedUser) {
            setUser(selectedUser); 
        }
    };

    const handleDelete = (deleteId) => {
        if(confirm("Bạn chắc chắn muốn xóa user này chứ?")){
            setUsers(prevUsers => prevUsers.filter(user => user.ID !== deleteId));
            alert("Đã xóa thành công!")
        }
    };

    return (
        <div className='container-content'>
            <form className='user-form' onSubmit={(e) => e.preventDefault()}>
                <input id="name" type="text" placeholder='Name' value={user.Name} onChange={(e) => onInput(e, "Name")} required />
                <input id="age" type="number" placeholder='Age' value={user.Age} onChange={(e) => onInput(e, "Age")} required />
                <input id="address" type="text" placeholder='Address' value={user.Address} onChange={(e) => onInput(e, "Address")} required />
                <select value={user.Gender} onChange={(e) => onInput(e, "Gender")} required>
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <button id="save-btn" type="button" onClick={handleSave}>Save</button>
            </form>
            <FCommontable 
                columns={columns} 
                rows={users} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
            />
        </div>
    );
}

export default App;
