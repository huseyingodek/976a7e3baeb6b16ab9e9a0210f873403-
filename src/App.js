import { useState, useEffect } from "react";
import { data as veriler, INITIAL_CATEGORY } from "./data";

function App() {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [kalanData, setKalanData] = useState([]);
  const [category, setCategory] = useState(INITIAL_CATEGORY);
  const [sibling,setSibling] = useState([]);
  const selectedDatas = [],
    currentCategory = [],
    addButtonElements = document.querySelectorAll(".bottom");
  let { length } = category;

  const get = (event) => {
    let text = event.target.nextElementSibling.innerText;
    if (event.target.checked) {
      selectedDatas.push(text);
    } else {
      let item = selectedDatas.indexOf(text);
      if (item !== -1) {
        selectedDatas.splice(item, 1);
      }
    }
  };

  const getValue = (event) => {
    get(event);
    if (selectedDatas.length === 0) {
      for (let i = 0; i < addButtonElements.length; i++) {
        addButtonElements[i].children[0].classList.remove("selected");
        addButtonElements[i].children[0].innerText = `Add Product`;
      }
    } else {
      addAllButon();
    }
  };

  const removeValue = (event) => {
    get(event);
    if (selectedDatas.length === 0) {
      for (let i = 0; i < addButtonElements.length; i++) {
        addButtonElements[i].children[1].classList.remove("selected");
        addButtonElements[i].children[1].innerText = `Remove Product`;
      }
    } else {
      removeAllButon();
    }
  };

  const addAllButon = () => {
    if (category.length > 1) {
      for (let i = 0; i < addButtonElements.length; i++) {
        addButtonElements[i].children[0].classList.add("selected");
        addButtonElements[
          i
        ].children[0].innerText = `Add ${selectedDatas.length} Product`;
      }
    } else {
      addButtonElements[0].children[0].classList.add("selected");
      addButtonElements[0].children[0].innerText = `Add ${selectedDatas.length} Product`;
    }
  };

  const removeAllButon = () => {
    if (category.length > 1) {
      for (let i = 0; i < addButtonElements.length; i++) {
        addButtonElements[i].children[1].classList.add("selected");
        addButtonElements[
          i
        ].children[1].innerText = `Remove ${selectedDatas.length} Product`;
      }
    } else {
      addButtonElements[0].children[1].classList.add("selected");
      addButtonElements[0].children[1].innerText = `Remove ${selectedDatas.length} Product`;
    }
  };

  const getLastItems = (last) => {
    return data.filter((item) =>
      last.includes(item.productName) === false ? item : item[last]
    );
  };

  const addProducts = (e) => {
    clear(0, "Add");
    if (selectedDatas.length === 0) {
      alert("En az 1 seçim yapınız..!");
    } else {
      if (currentData.length === 0) {
        setCurrentData(selectedDatas);
      } else {
        const newDatas = [...currentData, ...selectedDatas];
        setCurrentData(newDatas);
      }
      if(category.length > 1){
        const element = e.target.parentElement.previousElementSibling;
        console.log(element);
      }
    }
  };

  const clear = (child, status) => {
    for (let i = 0; i < addButtonElements.length; i++) {
      addButtonElements[i].children[child].classList.remove("selected");
      addButtonElements[i].children[child].innerText = `${status} Product`;
    }
  };

  const pass = () => {
    let newData = [
      ...kalanData,
      { id: Number(currentData[0].at(-1)), productName: currentData[0] },
    ];
    let sort = newData.sort((a, b) => a.id - b.id);
    setKalanData(sort);
    currentData.length = 0;
    setCurrentData(currentData);
  };

  const removeProducts = (e) => {
    if (currentData.length == 0) {
      window.alert("Silinecek Ürün Bulunamadı..!");
    } else {
      if (selectedDatas.length == 0) {
        alert("Lütfen silinecek ürünü seçiniz..!");
      } else if (selectedDatas.length == 1) {
        clear(1, "Remove");
        let newData = selectedDatas.map((selected) => {
          return { id: Number(selected.at(-1)), productName: selected };
        });
        let combineDatas = [...kalanData, ...newData].sort(
          (x, y) => x.id - y.id
        );
        let diff = currentData.filter(
          (current) => !selectedDatas.includes(current)
        );
        setCurrentData(combineDatas);
        setCurrentData(diff);
      } else if (selectedDatas.length > 1) {
        let newData = selectedDatas.map((selected) => {
          return { id: Number(selected.at(-1)), productName: selected };
        });
        let combineDatas = [...kalanData, ...newData].sort(
          (x, y) => x.id - y.id
        );
        let diff = currentData.filter(
          (current) => !selectedDatas.includes(current)
        );
        setKalanData(combineDatas);
        setCurrentData(diff);
        clear(1, "Remove");
      }
    }
  };

  const addCategory = () => {
    length++;
    currentCategory.push(...category, {
      id: length,
      categoryName: `Category ${length}`,
    });
    setCategory(currentCategory);
  };

  const removeCategory = (e) => {
    length--;
    let text =
      e.target.parentElement.parentElement.firstChild.children[1].innerText;
    let item = category.filter((item) => item.categoryName !== text);
    if (currentData.length > 0) {
      let response = window.confirm(
        "Kategori tamamen silmek istediğinize emin misiniz ?"
      );
      if (response) {
        pass();
        setCategory(item);
      }
    } else {
      setCategory(item);
    }
  };

  useEffect(() => {
    setData(veriler);
    setKalanData(getLastItems(currentData));
  }, [currentData, category]);

  return (
    <main className="container pt-3">
      <div className="row">
        <p className="title">Initial Screen</p>
        <div className="col col-12 col-lg-6">
          <div className="section">
            <div className="title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                className="bi bi-box"
                viewBox="0 0 16 16"
              >
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
              </svg>
              <span className="ms-2">Available Products</span>
            </div>
            <div className="products mt-3">
              <ul>
                {currentData.length == 0
                  ? data.map((value) => (
                      <li key={value.id}>
                        <input
                          type="checkbox"
                          name={value.id}
                          id={value.id}
                          onClick={getValue}
                        />
                        <label htmlFor={value.id} className="ms-2">
                          {value.productName}
                        </label>
                      </li>
                    ))
                  : kalanData.map((value) => (
                      <li key={value.id}>
                        <input
                          type="checkbox"
                          name={value.id}
                          id={value.id}
                          onClick={getValue}
                        />
                        <label htmlFor={value.id} className="ms-2">
                          {value.productName}
                        </label>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <div className="section active mt-4 mb-4">
            <div className="title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                className="bi bi-layout-text-window-reverse"
                viewBox="0 0 16 16"
              >
                <path d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z" />
                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 4v10a1 1 0 0 0 1 1h2V4H1zm4 0v11h9a1 1 0 0 0 1-1V4H5z" />
              </svg>
              <span className="ms-2 review">Review</span>
            </div>
            <div className="products mt-3">
              <p>
                Avaible Products:
                <span>
                  {currentData.length == 0 ? data.length : kalanData.length}
                </span>
              </p>
              <p className="mb-3">
                Categories:<span>{category.length}</span>
              </p>
              {category.length == 1 ? (
                <p>
                  Category {category.length}:{" "}
                  <span>{currentData.length} Products</span>
                </p>
              ) : (
                category.map((ctgry, index) => (
                  <p key={index}>
                    Category {ctgry.id}:{" "}
                    <span>{currentData.length} Products</span>
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="col col-12 col-lg-6 category">
          {category.length == 1
            ? category.map((ctgry, index) => (
                <div className="section" key={index}>
                  <div className="title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-boxes"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
                    </svg>
                    <span className="ms-2">{ctgry.categoryName}</span>
                  </div>
                  <div className="content">
                    {currentData.length == 0 ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-suit-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                        </svg>
                        <p>Select products add here</p>
                      </>
                    ) : (
                      <div className="products mt-3">
                        <ul>
                          {currentData.map((value, index) => (
                            <li key={index}>
                              <input
                                type="checkbox"
                                name={index}
                                onClick={removeValue}
                              />
                              <label className="ms-2">{value}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="bottom">
                    <button className="me-2" onClick={(e) => addProducts(e)}>
                      Add Product
                    </button>
                    <button onClick={(e) => removeProducts(e)}>
                      Remove Product
                    </button>
                    <button onClick={(e) => removeCategory(e)}>
                      Remove Category
                    </button>
                  </div>
                </div>
              ))
            : category.map((ctgry, index) => (
                <div className="section" key={index}>
                  <div className="title">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-boxes"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
                    </svg>
                    <span className="ms-2">{ctgry.categoryName}</span>
                  </div>
                  <div className="content">
                    {currentData.length == 0 ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-suit-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                        </svg>
                        <p>Select products add here</p>
                      </>
                    ) : (
                      <div className="products mt-3">
                        <ul>
                          {currentData.map((value, index) => (
                            <li key={index}>
                              <input
                                type="checkbox"
                                name={index}
                                onClick={removeValue}
                              />
                              <label className="ms-2">{value}</label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="bottom">
                    <button className="me-2" onClick={(e) => addProducts(e)}>
                      Add Product
                    </button>
                    <button onClick={(e) => removeProducts(e)}>
                      Remove Product
                    </button>
                    <button onClick={(e) => removeCategory(e)}>
                      Remove Category
                    </button>
                  </div>
                </div>
              ))}

          <button className="catButton mt-4" onClick={addCategory}>
            Add to Category
          </button>
        </div>
      </div>
    </main>
  );
}
export default App;
