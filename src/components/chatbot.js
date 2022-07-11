import React, { useState, useEffect, useRef } from "react";
import { hashRandom } from "react-hash-string";

import botlogo from "../images/SAL_avatar.png";
import stopsign from "../images/x-icon.png";
//  material ui
import { Avatar, Container, Grid, Button, TextField } from "@mui/material";
import { makeStyles, styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import Typing from "./Typing";
// import { border } from '@mui/system';
import parse from "html-react-parser";

const useStyles = makeStyles({
	paper: {
		background: "#F0F8FF",
		// color: 'white',
		height: "1000px",
		fontFamily: "sans-serif",
		letterSpacing: "0.5px",
		border: "2px solid black",
	},

	AvatarStyle: {
		margin: 10,
		width: 80,
		height: 80,
	},

	headerTitle: {
		color: "white",
		fontSize: "40px",
		float: "left",
		marginTop: "-30px",
		marginLeft: "30px",
	},
	stopsignStyle: {
		background: "None",
		cursor: "pointer",
		float: "right",
		marginTop: "15px",
		marginRight: "-30px",
		width: "30px",
		height: "30px",
		// marginRight: "1px"
	},
	msgPage: {
		height: "470px",
		width: "500px",
		overflowY: "scroll",
		border: "1px solid #CCC",
		display: "inline-block",
		// background: "yellowgreen"
	},

	formStyle: {
		width: "470px",
		height: "20px",
		position: "relative",
	},

	buttonStyle: {
		// width: "10px",
		// height: "10px",
		// // background: "green",
		marginTop: "50px",
		marginLeft: "10px",
		// border: "black"
	},

	msgBottomStyle: {},
});

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

function Chatbot() {
	const [sessid] = useState("XX" + hashRandom());
	const classes = useStyles();
	const [mssg, setMssg] = useState([
		{
			id: 0,
			type: false,
			value: "Hi! I am Tiro.\nWhat is ur name?",
			sessid: sessid,
			tags: null,
		},
	]);
	const [currmssg, setCurrmssg] = useState("");
	const [buttonid, setButtonid] = useState(1);
	const inputRef = useRef(null);
	const messagesEndRef = useRef(null);
	const [isLoading, setLoading] = useState(true);
	const firstRef = useRef(null);
	const [tags, setTags] = useState([]);
	const [reco, setReco] = useState([]);

	let reco_all = [];

	// CommonJS
	// const parser = require('html-react-parser');

	const baseURL = "http://127.0.0.1:8000/api/";

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	};

	//  testing hash
	console.log("###### hash testing #########");

	// 2004276715

	useEffect(() => {
		// setLoading(true);
		console.log("intiating api hit ");

		console.log(sessid);
		if (firstRef.current !== null) {
			// console.log("hitting api ", sessid, `http://127.0.0.1:8000/api/recievereply/${sessid}/`)
			//  Call the get api here

			axios
				.get(`http://127.0.0.1:8000/api/recievereply/${sessid}/`)
				.then((res) => {
					console.log(res.data);
					setMssg([
						...mssg,
						{
							id: mssg.length,
							type: false,
							value: res.data.text_mssg,
							sessid: sessid,
							tags: res.data.pred_tag
								.replaceAll("Reco", "")
								.replaceAll("-", "")
								.replaceAll("SKINCARE", "")
								.replaceAll("SKINTYPE", "")
								.replaceAll("SKINCONCERN", "")
								.replaceAll("Preference", "")
								.replaceAll("SKINPREFERENCE", ""),
						},
					]);

					// Add api for recommendation
					if (
						res.data.text_mssg.includes(
							"It’s been lovely getting to know you, Yuty will analyse and find products that will work for you."
						)
					) {
						console.log("Create recommendation now");

						// setReco("reco");

						axios
							.get(`http://127.0.0.1:8000/api/chatrecommendation/${sessid}/`)
							.then((res) => {
								console.log(res.data.recommendations);
								// let reco = res.data.recommendations;
								setReco(res.data.recommendations);

								// res.data.recommendations.map(item => {

								//     reco_all.push({

								//         id: mssg.length,
								//         type: false,
								//         value: item.product_name,
								//         sessid: sessid,
								//         tags: ''

								//     })

								// })
							});
						// setButtonid(buttonid + 1);
					}
				})
				.catch((err) => console.log(err));

			console.log(firstRef.current, "hdhdhdhh");
		}

		inputRef.current.focus();

		// scrollToBottom;
	}, [buttonid]);

	useEffect(scrollToBottom, [mssg]);

	// useEffect(() => {
	//     axios.get(`http://127.0.0.1:8000/api/chatrecommendation/${sessid}/`)
	//         .then((res) => {
	//             console.log(res.data.recommendations, "hitting reco");
	//             res.data.recommendations.map(item => {
	//                 console.log(item.product_name);
	//                 let addobj = {
	//                     id: mssg.length,
	//                     type: false,
	//                     value: item.product_name,
	//                     sessid: sessid,
	//                     tags: 'reco'

	//                 }
	//                 setMssg([...mssg, addobj]);
	//                 reco_all.push(addobj);
	//             })
	//         })
	// }, [reco])

	const handleChange = (e) => {
		e.preventDefault();
		console.log(" change in text box");
		console.log(e.target.value);
		setCurrmssg(e.target.value);
		setLoading(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currmssg !== "") {
			//  Post the message
			const payload = {
				question: currmssg,
				sessid: sessid,
			};
			axios
				.post(`http://127.0.0.1:8000/api/recievemessage`, {
					question: currmssg,
					sessid: sessid,
				})
				.then((response) => {
					console.log(
						response.data,
						`http://127.0.0.1:8000/api/recievereply/${sessid}/`
					);
					console.log("Post Successful.......");
					setButtonid(buttonid + 1);
				})
				.catch((err) => console.log(err));

			setMssg([
				...mssg,
				{
					id: mssg.length,
					type: true,
					value: currmssg,
					sessid: sessid,
					tags: null,
				},
			]);

			setCurrmssg("");

			inputRef.current.value = "";
			firstRef.current = "Chat Started";
			setLoading(true);
			console.log("$$$$$$$$$$$");
			console.log(tags, "tags");
			console.log("$$$$$$$$$$$");
		}
	};

	console.log(reco, "=====>");
	console.log(mssg, "=====>");
	console.log(reco_all, "=====>");

	return (
		<div className="chatBoxMain">
			<Container className={classes.paper}>
				<Typography align="center">
					<h1>
						ChatBot Demo <hr />
					</h1>
				</Typography>

				<br />
				<br />

				{/* Grid For chat bot header  */}
				<Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					<Grid item xs={6}>
						<Item>
							<div className="msg-inbox">
								{/* Add Chatbot frontend here  */}
								<div class="msg-header">
									<Grid container spacing={1}>
										<Grid item xs={2}>
											<div class="msg-header-img">
												<Avatar src={botlogo} className={classes.AvatarStyle} />
											</div>
										</Grid>
										<Grid item xs={8}>
											<Typography variant="h6" className={classes.headerTitle}>
												<h6>AI beauty Advisor</h6>
											</Typography>
										</Grid>
										<Grid item xs={2}>
											<Button>
												<img src={stopsign} className={classes.stopsignStyle} />
											</Button>
										</Grid>
									</Grid>
								</div>

								{/*  Adding chat page */}
								{/* <div className="chat-page"> */}

								{/* <div className="chat"> */}
								{/* <div className={classes.msgPage}> */}
								<div className="msg-page">
									{mssg.map((item) => (
										<div
											className={item.type ? "recieved-msg" : "outgoing-chats"}
										>
											<div
												className={
													item.type
														? "recieved-msg-inbox"
														: "outgoing-chats-msg"
												}
											>
												<p key={item.id}> {parse(item.value)}</p>
											</div>
										</div>
									))}

									{reco.map((item) => (
										<div
											className={item.type ? "recieved-msg" : "outgoing-chats"}
										>
											<div
												className={
													item.type
														? "recieved-msg-inbox"
														: "outgoing-chats-msg"
												}
											>
												<p> Product name : {parse(item.product_name)}</p>
											</div>
										</div>
									))}
									{isLoading ? null : <Typing />}
									<div ref={messagesEndRef} />
								</div>

								<div>
									<form>
										{/* <Box sx={{ display: 'flex', alignItems: 'flex-end', border: "green" }}> */}
										<TextField
											id="message"
											className={classes.formStyle}
											label="Enter your Message"
											name="message"
											variant="outlined"
											placeholder="Enter Your Message"
											onChange={handleChange}
											inputRef={inputRef}
										/>
										<Button
											onClick={handleSubmit}
											className={classes.buttonStyle}
											type="submit"
										></Button>
										{/* <SendIcon className={classes.iconStyle} />    */}
										{/* </Box> */}
									</form>
								</div>

								<br />
								<br />
							</div>
						</Item>
					</Grid>
					<Grid item xs={6}>
						<Item>
							<h1>Intentions </h1>
							<hr />
							<Box>
								<div>
									{mssg.map((item) =>
										item.tags ? (
											<Button
												className={classes.buttonStyle}
												variant="contained"
												size="large"
											>
												{item.tags}
											</Button>
										) : null
									)}

									{isLoading ? null : <Typing />}
								</div>
							</Box>
						</Item>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Chatbot;
