import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
    const [buttonText, setButtonText] =React.useState("Да");
    
    function handleConfirm(e) {
        e.preventDefault();
        setButtonText("Удаление...");
        props
            .onDelete()
            .then(() => handleClosePopup())
            .finally(() => {
                setButtonText("Да");
            })
    }

    function handleClosePopup() { //Ф-я ручного закрытия попапа
        props.onClose();
    }

    return (
        <PopupWithForm
            name="delete"
            title="Удалить место?"
            submitText={buttonText}
            onClose={handleClosePopup}
            isOpen={props.isOpen}
            onSubmit={handleConfirm}
        />
    )
}

export default ConfirmDeletePopup;