function appendToMainAndAddHeight(arr, backDrop, generator) {
    let cartItemNumber = 0;
    let sizeChange = 500;
    backDrop.style.height = sizeChange + 'px';
    arr.forEach((item) => {
        cartItemNumber++;
        if (cartItemNumber > 4) {
            sizeChange += 115;
            backDrop.style.height = sizeChange + 'px';
        }
        generator(item);
    });
}

export default appendToMainAndAddHeight;