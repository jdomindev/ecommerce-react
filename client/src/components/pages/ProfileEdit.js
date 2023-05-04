import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

// import Auth from "../../utils/auth";

import { GET_ME } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";
// import { UPDATE_ADDRESS } from "../../utils/mutations";

export default function ProfileEdit() {
  const { data, loading } = useQuery(GET_ME);
  const user = data?.me;
  // const address = user?.address || {}

  // Need to work on updating user address, works in backend and returns address
  // Somehow have it show not undefined client side
  // UPDATE: updateUSER works updateADDRESS reaches the try catch block client side and fails
  // go back to graphql and mess around again... idk

  // const newAddress = async() => await user.address || {}
  const [userUpdatedData, setUserUpdatedData] = useState({ user });
  // const [userUpdatedAddress, setUserUpdatedAddress] = useState( { address } ) ;

  const [updateUser] = useMutation(UPDATE_USER);
  // const [updateAddress] = useMutation(UPDATE_ADDRESS);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserUpdatedData({ ...userUpdatedData, [name]: value });
  };

  // const handleAddressChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserUpdatedAddress({ ...userUpdatedAddress, [name]: value });
  // };

  const handleUserUpdate = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      await updateUser({
        variables: { ...userUpdatedData },
      });

      setTimeout(() => {
        window.location.assign("/profile");
      }, 1000);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // setUserFormData({
    //   email: '',
    //   password: '',
    // });
  };

  // const handleAddressUpdate = async (event) => {
  //   event.preventDefault();

  //   // check if form has everything (as per react-bootstrap docs)
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   try {
  //     const { data } = await updateAddress({
  //       variables: { ...userUpdatedAddress },
  //     });

  //     console.log('im here')

  //     setTimeout(() => {
  //       window.location.assign("/profile");
  //     }, 1000);

  //     // Auth.login(data.addUser.token);
  //   } catch (err) {
  //     console.error(err);
  //     setShowAlert2(true);
  //   }

  //   // setUserFormData({
  //   //   email: '',
  //   //   password: '',
  //   // });
  // };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      ) : (
        <div className="col-md-12">
          <div className="d-flex justify-content-center form-container">
            <Card className="login-card">
              <div className="">
                <h2>Account Details</h2>
                <p>Update any of the entries you would like to change and apply changes</p>
                <h4>Basic Info</h4>
              </div>
              {/* This is needed for the validation functionality above */}
              <Form
                noValidate
                validated={validated}
                onSubmit={handleUserUpdate}
              >
                {/* show alert if server response is bad */}
                <Alert
                  dismissible
                  onClose={() => setShowAlert(false)}
                  show={showAlert}
                  variant="danger"
                >
                  Something went wrong updating your account!
                </Alert>

                <Form.Group>
                  <Form.Label htmlFor="firstName">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user.firstName}
                    name="firstName"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="lastName">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user.lastName}
                    name="lastName"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={user.email}
                    name="email"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your new password"
                    name="password"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    className="btn-custom"
                    disabled={
                      !(
                        userUpdatedData.firstName ||
                        userUpdatedData.lastName ||
                        userUpdatedData.email ||
                        userUpdatedData.password
                      )
                    }
                    type="submit"
                    variant="success"
                  >
                    Apply Changes
                  </Button>
                </div>
              </Form>
              {/* <hr></hr> */}

              {/* <Form
                noValidate
                validated={validated2}
                onSubmit={handleAddressUpdate}
              >
                <Alert
                  dismissible
                  onClose={() => setShowAlert2(false)}
                  show={showAlert2}
                  variant="danger"
                >
                  Something went wrong updating your account!
                </Alert>
                <h4>Shipping Address</h4>
                <Form.Group>
                  <Form.Label htmlFor="street">Street Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={address.street}
                    name="street"
                    onChange={handleAddressChange}
                    value={userUpdatedAddress.street}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="aptNo">Apt No.</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={address.aptNo}
                    name="aptNo"
                    onChange={handleAddressChange}
                    value={userUpdatedAddress.aptNo}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="city">City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={address.city}
                    name="city"
                    onChange={handleAddressChange}
                    value={userUpdatedAddress.city}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="state">State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={address.state}
                    name="state"
                    onChange={handleAddressChange}
                    value={userUpdatedAddress.state}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="zipCode">Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={address.zipCode}
                    name="zipCode"
                    onChange={handleAddressChange}
                    value={userUpdatedAddress.zipCode}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="country">Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={address.country}
                    name="country"
                    onChange={handleAddressChange}
                    value={userUpdatedAddress.country}
                  />
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button
                    className="btn-custom"
                    disabled={
                      !(
                        userUpdatedAddress.street &&
                        userUpdatedAddress.city &&
                        userUpdatedAddress.state &&
                        userUpdatedAddress.zipCode
                      )
                    }
                    type="submit"
                    variant="success"
                  >
                    Submit
                  </Button>
                </div>
              </Form> */}
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
