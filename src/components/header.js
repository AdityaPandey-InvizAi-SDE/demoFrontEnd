import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

// import Link from '@material-ui/core/Link';

function Header() {
	// console.log(authorized, "hrader");

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" className="hello">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="primary"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						{/* <MenuIcon /> */}
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						TiroLabs
					</Typography>

					<Button
						color="inherit"
						variant="outlined"
						component={NavLink}
						to="/home"
					>
						Home
					</Button>
					<Button
						color="inherit"
						variant="outlined"
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					<Button
						color="inherit"
						variant="outlined"
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button>
					<Button
						color="inherit"
						variant="outlined"
						component={NavLink}
						to="/register"
					>
						Register
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Header;
