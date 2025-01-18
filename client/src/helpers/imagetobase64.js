const imageToBase64 = async (image) => {
    if (!image) {
        throw new Error("No image file provided");
    }

    const reader = new FileReader();

    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
    });

    return data;
};

export default imageToBase64;