import React from "react";

const UserNameInput: React.FC<{
    userNameInput: string;
    setUserNameInput: (value: string) => void;
    setUserName: (value: string) => void;
}> = ({ userNameInput, setUserNameInput, setUserName }) => {
 return (
    <div>
        <input type="text"
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
        placeholder="닉네임을 입력하세요 !!"
        />
        <button
        onClick={() => userNameInput && setUserName(userNameInput)}>
            닉네임 등록
        </button>
    </div>
 )   
}

export default UserNameInput;