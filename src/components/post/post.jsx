import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Comments } from "../comments/comments";
import Share from "../share/Share";

export const Post = ({ post }) => {

    const [ commentsOpen, setCommentsOpen ] = useState(false);
    const [ shareOpen, setShareOpen ] = useState(false);

    //temporary like function
    const [liked, setLiked ] = useState(false);

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link
                                to={`/profile/${post.userId}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon style={{cursor: "pointer"}}/>
                </div>

                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
                </div>

                <div className="info">
                    <div className="item">
                        { liked ? <FavoriteOutlinedIcon onClick={() => setLiked(!liked)}/> : <FavoriteBorderOutlinedIcon onClick={() => setLiked(!liked)}/> }
                        12 Likes
                    </div>
                    <div className="item" onClick={() => setCommentsOpen(!commentsOpen)} >
                        <TextsmsOutlinedIcon />
                        12 Comments
                    </div>
                    <div className="item" onClick={() => setShareOpen(!shareOpen)}>
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>

                { commentsOpen && <Comments />}
                { shareOpen && <Share />}

            </div>    
        </div>
    );
};