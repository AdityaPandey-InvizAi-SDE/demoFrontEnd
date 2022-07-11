import React, { useRef, useState, useEffect } from "react";
import { Container, Stack, Grid, Box, Button, TextField } from "@mui/material";
import { makeStyles, styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import ReactLoading from "react-loading";

import MediaCard from "../card";
import { color } from "@mui/system";

const useStyles = makeStyles({
	paper: {
		background: "#F0F8FF",
		// color: 'white',
		height: "900px",
		fontFamily: "sans-serif",
		letterSpacing: "0.5px",
		border: "2px solid black",
	},

	videoContainer: {
		width: "640px",
		height: "480px",
		// background: "rgb(0, 0, 0)",
		background: "white",
		align: "center",
		marginLeft: "25vw",
		marginRight: "25vw",
	},

	pictureContainser: {
		height: "50vh",
		width: "50vw",
		marginLeft: "25vw",
		marginTop: "5vh",
		// visibility: 'hidden'
	},
	buttonStyle: {
		background: "white",
		height: "4vh",
		width: "20vw",
		top: "-80vh",
		// marginLeft: "-8vw",
		fontFamily: "Proxima Nova",
		fontSize: "15px",
		color: " #000000",
		variant: "contained",
		marginLeft: "35vw",
		marginRight: "35vw",
		// visibility : 'visible'
	},

	IconStyles: {
		// background: 'blue',
		position: "absolute",
		top: "20vh",
		right: "38vw",
	},

	IconCameraStyles: {
		background: "white",
		position: "absolute",
		top: "60vh",
		right: "55vw",
		// width: '5vw'
		// align: "center"
	},

	loaderStyles: {
		marginLeft: "15vw",
	},

	loaderStyles1: {
		marginLeft: "25vw",
	},
	gridContainer: {
		paddingLeft: "5vw",
		paddingRight: "5px",
		// height: "10px",
	},
	box: {
		width: "320px",
		padding: "10px",
		border: "5px solid gray",
		margin: "0",
		// background: { bgcolor },
	},
});

const SkinType = () => {
	const classes = useStyles();
	const videoRef = useRef(null);
	const photoRef = useRef(null);
	const [startStream, setStartStream] = useState(false);
	const [takesnap, setTakeSnap] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [skintone_color, Setcolor] = useState({ color: null, percentage: 0 });
	const [skintone_color1, Setcolor1] = useState({ color: null, percentage: 0 });
	const [imageid, setImageId] = useState(null);

	const flipped = true;
	var snapshot = document.getElementById("snapshot");
	const current = new Date();
	const date = `${current.getDate()}-${
		current.getMonth() + 1
	}-${current.getFullYear()}`;
	var today = Math.round(new Date().getTime() / 1000);

	var currdatetime = date + "X" + today;

	// var bgcolor = "red";

	//  Create random number between two numbers
	function randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	// const rndInt = randomIntFromInterval(1, 99999999);
	// console.log(rndInt, "random number");

	// useEffect(() => {
	//     getVideo();
	// }, [videoRef]);

	function dataURItoBlob(dataURI) {
		var byteString = atob(dataURI.split(",")[1]);
		var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

		var buffer = new ArrayBuffer(byteString.length);
		var data = new DataView(buffer);

		for (var i = 0; i < byteString.length; i++) {
			data.setUint8(i, byteString.charCodeAt(i));
		}

		return new Blob([buffer], {
			type: mimeString,
		});
	}

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({ video: { width: 300 } })
			.then((stream) => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch((err) => {
				console.error("error:", err);
			});

		setStartStream(true);
		setTakeSnap(false);

		document.getElementById("photoElement").style.visibility = "hidden";
		document.getElementById("cameraicon").style.visibility = "visible";
		document.getElementById("closeicon").style.visibility = "visible";
		document.getElementById("backicon").style.visibility = "hidden";
	};

	const stopVideo = () => {
		console.log("stop video");
		let video = videoRef.current;
		const mediaStream = video.srcObject;
		const tracks = mediaStream.getTracks();
		// tracks[0].stop();
		console.log(tracks.length);
		for (let i = 0; i < tracks.length; i++) {
			let track = tracks[i];
			track.stop();
		}
		// stream.load();
		setStartStream(false);
		document.getElementById("cameraicon").style.visibility = "hidden";
	};

	const captureSnap = () => {
		console.log("capture snap");
		let video = videoRef.current;
		let photo = photoRef.current;
		console.log(video, photo, "all");
		let ctx = photo.getContext("2d");

		var img = new Image();

		const width = 320;
		const height = 240;
		photo.width = width;
		photo.height = height;

		if (flipped) {
			ctx.translate(0 + photo.width / 2, 0 + photo.width / 2);
			ctx.scale(-1, 1);
			ctx.translate(-(0 + photo.width / 2), -(0 + photo.width / 2));
		}

		ctx.drawImage(video, 0, 0, width, height);
		//  call the post api to send image to the django server
		img.src = photo.toDataURL("image/png");
		img.width = 640;
		img.height = 480;

		snapshot.innerHTML = "";

		snapshot.appendChild(img);

		// save image to local folder
		// console.log(img.src , "all image from image source" ) ;

		var dataURI = snapshot.firstChild.getAttribute("src");
		var imageData = dataURItoBlob(dataURI);

		var formdata = new FormData();

		const rndInt = randomIntFromInterval(1, 99999999);
		setImageId(rndInt);

		formdata.append("imagename", imageData, `image_${currdatetime}.png`);
		formdata.append("imageid", rndInt);

		axios
			.post(`http://127.0.0.1:8000/api/foundation_image_upload`, formdata)
			.then((res) => {
				console.log(res);
				console.log("image taken saved");
				//  Add api to run the
				setLoading(false);
				axios
					.get(
						`http://127.0.0.1:8000/api/foundation_matching_advisor/${rndInt}/`
					)
					.then((res) => {
						console.log(
							res.data,
							"list of recommandations",
							res.data[0].hexcolor
						);
						//  Move to new page to display results
						setLoading(true);
						Setcolor({
							color: res.data[0].hexcolor,
							percentage: res.data[0].color_percentage,
						});
						Setcolor1({
							color: res.data[1].hexcolor,
							percentage: res.data[1].color_percentage,
						});
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));

		setTakeSnap(true);

		document.getElementById("photoElement").style.visibility = "visible";
		document.getElementById("cameraicon").style.visibility = "hidden";
		document.getElementById("closeicon").style.visibility = "hidden";
		document.getElementById("backicon").style.visibility = "visible";
	};

	console.log(
		takesnap,
		startStream,
		currdatetime,
		isLoading,
		imageid,
		"<<<<<<<<<<<<<<<<"
	);
	var imageurl = `http://127.0.0.1:8000/api/id/${imageid}_100`;
	var imageurl1 = `http://127.0.0.1:8000/api/id/${imageid}_101`;
	var imageurl2 = `http://127.0.0.1:8000/api/id/${imageid}_102`;
	var imageurl3 = `http://127.0.0.1:8000/api/id/${imageid}_103`;
	return (
		<div className="main">
			<Typography align="center">
				<h1>
					Find your SkinType <hr />
				</h1>
			</Typography>

			{/* Add canvas to video  */}
			<div id="snapshot"></div>
			<Grid container spacing={2} direction="column">
				<Grid item xs={12} spacing={3} container sx={{ alignItems: "center" }}>
					<Grid item xs={12}>
						{takesnap ? null : (
							<video
								ref={videoRef}
								id="videoElement"
								className={classes.videoContainer}
								width="640"
								height="480"
								autoplay
								playsinline
							>
								{" "}
							</video>
						)}

						<div id="photoElement">
							<canvas
								ref={photoRef}
								className={classes.videoContainer}
								autoplay
								playsinline
							>
								{" "}
							</canvas>

							{isLoading ? (
								<div>
									<Grid container spacing={2} className={classes.gridContainer}>
										<Grid item xs={12} sm={4} md={3}>
											<MediaCard title="Face Detected" img={imageurl} />
										</Grid>
										<Grid item xs={12} sm={4} md={3}>
											<MediaCard title="Face Cropped" img={imageurl1} />
										</Grid>
										<Grid item xs={12} sm={4} md={3}>
											<MediaCard title="Left cheek" img={imageurl2} />
										</Grid>
										<Grid item xs={12} sm={4} md={3}>
											<MediaCard title="Focus area" img={imageurl3} />
										</Grid>
									</Grid>

									<h2>
										{" "}
										The Predicted skin tone color is: {
											skintone_color.color
										}{" "}
									</h2>
									<Grid container spacing={2} className={classes.gridContainer}>
										<Box
											sx={{
												width: 800 * skintone_color.percentage,
												height: 100,
												backgroundColor: skintone_color.color,
											}}
										/>
										<Box
											sx={{
												width: 800 * skintone_color1.percentage,
												height: 100,
												backgroundColor: skintone_color1.color,
											}}
										/>
									</Grid>
								</div>
							) : (
								<div className={classes.loaderStyles1}>
									<h3>
										{" "}
										Tiro is running analysis on your image. Please wait for the
										results .....
									</h3>
									<ReactLoading
										type={"bars"}
										color={"#1976d2"}
										height={"10%"}
										width={"10%"}
										className={classes.loaderStyles}
									/>
								</div>
							)}
						</div>

						<IconButton
							id="closeicon"
							className={classes.IconStyles}
							aria-label="close"
							onClick={stopVideo}
						>
							<CloseIcon />
						</IconButton>
						<IconButton
							id="backicon"
							className={classes.IconStyles}
							aria-label="close"
							onClick={getVideo}
						>
							<ArrowBackIcon />
						</IconButton>
					</Grid>
					<Grid item xs={12}>
						{startStream ? null : (
							<Button
								variant="contained"
								className={classes.buttonStyle}
								onClick={getVideo}
							>
								LIVE CAMERA
							</Button>
						)}
					</Grid>
					<Grid item xs={12}>
						<IconButton
							id="cameraicon"
							className={classes.IconCameraStyles}
							aria-label="capture"
							onClick={captureSnap}
						>
							<CameraAltIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
};

export default SkinType;
