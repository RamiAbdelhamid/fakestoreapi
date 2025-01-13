// MockAPI 
const apiUrl = "https://6784af2d1ec630ca33a529a5.mockapi.io/user";

// Function to Fetch Products and Display Them
async function fetchproducts() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const tableBody = document.querySelector("#ProductTable tbody");
        tableBody.innerHTML = "";

        data.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.salary}</td>
                <td>${product.email}</td>
                <td><img src="${product.image}" alt="product Image" style="width: 50px; height: 50px; object-fit: cover;"></td>

                <td>
                    <button onclick="updateproduct(${product.id})">Update</button>
                    <button onclick="deleteproduct(${product.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Add Product
document.getElementById("addForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const salary = document.getElementById("salary").value;
    const email = document.getElementById("email").value;
        const image = document.getElementById("image").value;


    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                salary: salary,
                email: email,
                image:image
            })
        });
        alert("product added successfully");
        fetchproducts();
        document.getElementById("addForm").reset();
    } catch (error) {
        console.error("Error adding product:", error);
    }
});

// Delete Product
async function deleteproduct(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        alert("product deleted");
        fetchproducts();
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

// Update Product (Example of PUT)
async function updateproduct(id) {
    const newName = prompt("Enter new name");
    if (newName) {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            });
            alert("product updated");
            fetchproducts(); 
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }
}

// Fetch Product initially
fetchproducts();
