import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Modal from "../components/Modal";
import ButtonSm from "../components/ButtonSm";
import { sendRequest } from "../config/request";

const AddProperty = () => {
  const [cityOptions, setCityOptions] = useState([]);
  const navigate = useNavigate();
  const [seller_id, setSeller] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    property_type: "home",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    bedrooms: "",
    bathrooms: "",
    square_feet: "",
    price: "",
    listing_date: "",
    description: "",
    seller: seller_id,
  });

  const [images, setImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Check session and set seller ID
  useEffect(() => {
    const checkSession = async () => {
      try {
        const sellerResponse = await sendRequest({
          method: "GET",
          route: "/check-session",
          credentials: "include",
          withCredentials: true,
        });
        if (!sellerResponse.success) {
          navigate("/login");
          return;
        }
        setSeller(sellerResponse.user.id);
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    checkSession();
  }, [navigate]);

  useEffect(() => {
    if (seller_id) {
      setPropertyDetails((prevDetails) => ({
        ...prevDetails,
        seller: seller_id,
      }));
    }
  }, [seller_id]);

  // Fetch city options when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const optionsListResponse = await sendRequest({
          method: "GET",
          route: "getOptions",
        });
        setCityOptions(optionsListResponse);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!propertyDetails.property_type)
      errors.property_type = "Property type is required";
    if (!propertyDetails.address) errors.address = "Address is required";
    if (!propertyDetails.city) errors.city = "City is required";
    if (!propertyDetails.state) errors.state = "State is required";
    if (!propertyDetails.zip_code) errors.zip_code = "Zip Code is required";
    if (
      propertyDetails.property_type === "home" &&
      !propertyDetails.bedrooms
    )
      errors.bedrooms = "Bedrooms are required";
    if (
      propertyDetails.property_type === "home" &&
      !propertyDetails.bathrooms
    )
      errors.bathrooms = "Bathrooms are required";
    if (!propertyDetails.square_feet)
      errors.square_feet = "Square feet are required";
    if (!propertyDetails.price) errors.price = "Price is required";
    if (!propertyDetails.listing_date)
      errors.listing_date = "Listing date is required";
    if (!propertyDetails.description)
      errors.description = "Description is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) return;

    try {
      const formData = new FormData();
      Object.entries(propertyDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });
      images.forEach((image) => formData.append("images", image));
      const response = await sendRequest({
        method: "POST",
        route: "/add-property",
        body: formData,
        credentials: "include",
        isFormData: true,
      });
      if (response.status === 401) {
        navigate("/login");
      } else {
        openModal();
        setPropertyDetails({
          property_type: "",
          address: "",
          city: "",
          state: "",
          zip_code: "",
          bedrooms: "",
          bathrooms: "",
          square_feet: "",
          price: "",
          listing_date: "",
          description: "",
          seller: "",
        });
        setImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setValidationErrors({
        ...validationErrors,
        images: "You can upload a maximum of 3 images",
      });
    } else {
      setImages(files);
      setValidationErrors({ ...validationErrors, images: null });
    }
  };

  return (
    <div>
      <div className="max-w-lg space-y-4 mb-10">
        <h2 className="text-3xl text-gray-800 font-medium leading-9">
          Add Your Property
        </h2>
        <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3"></div>
      </div>
      <div className="max-w-lg space-y-4">
        <div className="w-full">
          <select
            value={propertyDetails.property_type}
            onChange={(e) =>
              setPropertyDetails({
                ...propertyDetails,
                property_type: e.target.value,
                ...(e.target.value === "land" && { bedrooms: "", bathrooms: "" }),
              })
            }
            className="p-3 border rounded-md border-gray-300 w-full"
          >
            <option value="">Select Property Type</option>
            <option value="home">Home</option>
            <option value="land">Land</option>
          </select>
          {validationErrors.property_type && (
            <p className="text-red-400 text-sm">{validationErrors.property_type}</p>
          )}
        </div>

        <div className="w-full">
          <select
            value={propertyDetails.city}
            onChange={(e) =>
              setPropertyDetails({ ...propertyDetails, city: e.target.value })
            }
            className="p-3 border rounded-md border-gray-300 w-full"
          >
            <option value="">Select City</option>
            {cityOptions.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {validationErrors.city && (
            <p className="text-red-400 text-sm">{validationErrors.city}</p>
          )}
        </div>
        <Input
          label="Address"
          type="text"
          value={propertyDetails.address}
          onChange={(value) =>
            setPropertyDetails({ ...propertyDetails, address: value })
          }
          error={validationErrors.address}
        />
        <Input
          label="State"
          type="text"
          value={propertyDetails.state}
          onChange={(value) =>
            setPropertyDetails({ ...propertyDetails, state: value })
          }
          error={validationErrors.state}
        />
        <Input
          label="Zip Code"
          type="text"
          value={propertyDetails.zip_code}
          onChange={(value) =>
            setPropertyDetails({ ...propertyDetails, zip_code: value })
          }
          error={validationErrors.zip_code}
        />
        {propertyDetails.property_type === "home" && (
          <>
            <Input
              label="Bedrooms"
              type="number"
              value={propertyDetails.bedrooms}
              onChange={(value) =>
                setPropertyDetails({ ...propertyDetails, bedrooms: value })
              }
              error={validationErrors.bedrooms}
            />
            <Input
              label="Bathrooms"
              type="number"
              value={propertyDetails.bathrooms}
              onChange={(value) =>
                setPropertyDetails({ ...propertyDetails, bathrooms: value })
              }
              error={validationErrors.bathrooms}
            />
          </>
        )}
        <Input
          label="Square Feet"
          type="number"
          value={propertyDetails.square_feet}
          onChange={(value) =>
            setPropertyDetails({ ...propertyDetails, square_feet: value })
          }
          error={validationErrors.square_feet}
        />
        <Input
          label="Price"
          type="number"
          value={propertyDetails.price}
          onChange={(value) =>
            setPropertyDetails({ ...propertyDetails, price: value })
          }
          error={validationErrors.price}
        />
        <Input
          label="Listing Date"
          type="date"
          value={propertyDetails.listing_date}
          onChange={(value) =>
            setPropertyDetails({ ...propertyDetails, listing_date: value })
          }
          error={validationErrors.listing_date}
        />
        <Input
          label="Description"
          type="text"
          value={propertyDetails.description}
          onChange={(value) =>
            setPropertyDetails({ ...propertyDetails, description: value })
          }
          error={validationErrors.description}
        />
        <div>
          <label className="block text-gray-700">Upload Images (Max 3)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
          {validationErrors.images && (
            <p className="text-red-400 text-sm">{validationErrors.images}</p>
          )}
        </div>
        <div className="flex justify-center">
          <ButtonSm buttonText="Submit" onClick={handleSubmit} />
        </div>
        {showModal && <Modal message="Property Added Successfully" onClose={closeModal} />}
      </div>
    </div>
  );
};

export default AddProperty;
