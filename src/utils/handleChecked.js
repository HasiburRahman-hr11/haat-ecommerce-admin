

const handleChecked = (items, selectedItem, setSelectedItem) => {
    const handleChange = (e, data) => {
        const { name, checked } = e.target;
        if (checked) {
            if (name === "allSelect") {
                setSelectedItem(items);
            } else {
                setSelectedItem([...selectedItem, data]);
            }
        } else {

            if (name === "allSelect") {
                setSelectedItem([]);
            } else {

                let tempItem = selectedItem.filter((item) => item._id !== data._id);
                setSelectedItem(tempItem);
            }
        }
    };

    return handleChange;
}

export default handleChecked;