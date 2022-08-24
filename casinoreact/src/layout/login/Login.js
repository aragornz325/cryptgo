import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Form,
	InputDiv,
	BtnSubmit,
	FormCtn,
	ImageCtn,
	Link,
	Div,
	Input,
	TextField,
} from "./styles";
import Navbar from "../../components/navigation/NavBar";
import * as api from "../../controllers";
import delete_cookie from "../../functions/deleteCookie";
import setUsername from "../../store/actionCreators/setUsername";
import store from "../../store/reducers/store";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import AlertBar from "../../components/main/AlertBar";
import setAlert from "../../store/actionCreators/setAlert";

const Login = () => {
	const [style, setStyle] = useState({});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const response = await api.login(data);
		console.log("data", response);
		if (response["error"]) {
			setStyle({ background: "red" });
			return setAlert({
				display: true,
				text: response.error,
				color: "red",
			});
		} else if (response["statusCode"]) {
			setStyle({ background: "red" });
			return setAlert({
				display: true,
				text: response.message,
				color: "red",
			});
		} else {
			window.location = "/";
		}
	};

	return (
		<>
			<Navbar />
			<Form onSubmit={handleSubmit(onSubmit)}>
				<ImageCtn>
					<img
						style={{ width: "100%", height: "100%" }}
						src={"assets/home/dice.png"}
						alt=''
					/>
				</ImageCtn>
				<Div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
						}}>
						<img src='assets/home/navbar/logo.png' alt='' />
						<p
							style={{
								color: "#EDBE18",
								marginLeft: "10px",
								fontSize: "25px",
							}}>
							<b style={{ color: "#EDBE18" }}>LOG</b> IN
						</p>
					</div>

					<TextField
						type='text'
						label={<EmailIcon />}
						{...register("username")}
						required={true}
					/>
					<TextField
						label={<PasswordIcon />}
						type='password'
						placeholder='Password'
						{...register("password")}
						required={true}
					/>
					<BtnSubmit type='submit' style={style}>
						SUBMIT
					</BtnSubmit>
					{/* <BtnSubmit type="button" style={{transform: 'scale(.85)'}} onClick={() => window.location = '/signup'}>SIGNUP</BtnSubmit> */}
					<p style={{ color: "white", marginTop: "40px" }}>
						Not registered? <Link href='/signup'>Sign Up</Link>
					</p>
				</Div>
				<AlertBar />
			</Form>
		</>
	);
};

export default Login;
