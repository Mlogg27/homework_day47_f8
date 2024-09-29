import { useEffect } from 'react';

function FCommontable(props) {

    useEffect(() => {
        const onUpdate = (e) => {
            const updateId = e.currentTarget.dataset.updateId;
            props.onEdit(updateId); 
        };

        const onDelete = (e) => {
            const deleteId = e.currentTarget.dataset.deleteId;
            props.onDelete(deleteId); 
        };

        const updateBtn = document.querySelectorAll('button[data-update-id]');
        const deleteBtn = document.querySelectorAll('button[data-delete-id]');

        updateBtn.forEach((updateBtnEl) => {
            updateBtnEl.addEventListener("click", onUpdate);
        });

        deleteBtn.forEach((deleteBtnEl) => {
            deleteBtnEl.addEventListener("click", onDelete);
        });

        return () => {
            updateBtn.forEach((updateBtnEl) => {
                updateBtnEl.removeEventListener("click", onUpdate);
            });
            deleteBtn.forEach((deleteBtnEl) => {
                deleteBtnEl.removeEventListener("click", onDelete);
            });
        };
    }, [props.rows, props]); 


    if(props.rows.length ===0){
        return ( <span>Hiện không có user nào!</span>)
    }
    return (
        <table border="1" cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>
                    {props.columns.map((columnEl, idx) => (
                        <th key={idx}>{columnEl}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.rows.map((rowEl, ridx) => ( 
                    <tr key={ridx}>
                        {props.columns.map((columnEl, cidx) => {
                            if (columnEl === "Action") {
                                return (
                                    <td key={`${cidx}-${ridx}`}>
                                        <button data-update-id={rowEl.ID}>
                                            <i className="fa-solid fa-pen-nib"></i>
                                        </button>
                                        <button data-delete-id={rowEl.ID}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                );
                            } else {
                                return (
                                    <td key={`${cidx}-${ridx}`}>
                                        {rowEl[columnEl]}
                                    </td>
                                );
                            }
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

FCommontable.defaultProps = {
    columns: [],
    rows: [],
};

export default FCommontable;
