import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col } from "antd";
import List from "../components/List";
import "../assets/items.css";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.rootReducer);
  const [selectCategory, setSelectCategory] = useState("meats");
  const category_type = [
    {
      name: "meats",
      imgURL: "https://wallpaperaccess.com/full/1462795.jpg",
    },
    {
      name: "Vegetables",
      imgURL: "https://wallpapercrafter.com/desktop/273669-various-colorful-vegetables-at-a-stallvarious-vege.jpg",
    },
    {
      name: "Fruits",
      imgURL: "https://wallpaperaccess.com/full/2329950.jpg",
    }
  ]
  const getAllItems = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/items/get-all-items")
      .then((response) => {
        setTimeout(() => {
          dispatch({ type: "hideLoading" });
          setItemsData(response.data);
        }, 500); // Adjust the delay time as needed
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <DefaultLayout>
        <div className="d-flex">
          {category_type.map((category)=>{
            return <div
              onClick={()=>setSelectCategory(category.name)}
              className={`d-flex category ${selectCategory===category.name && 'selected-category'}`}>
              <h3>{category.name}</h3>
              <img src={category.imgURL} height={82} width={112} />
            </div>
          })}
        </div>
      {loading ? (
        <div className="spinner">
          <div class="spinner-border" role="status"></div>
        </div>
      ) : (
        <Row gutter={18}>
          {itemsData.filter((i)=>i.category.toLowerCase()===selectCategory.toLowerCase()).map((item) => {
            return (
              <Col span={6} xs={24} lg={6} md={12} sm={6}>
                <List item={item} />
              </Col>
            );
          })}
        </Row>
      )}
    </DefaultLayout>
  );
};

export default Homepage;
