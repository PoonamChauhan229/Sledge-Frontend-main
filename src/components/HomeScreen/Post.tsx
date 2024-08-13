import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, ListItem, Chip, Autocomplete, IconButton, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, color: "#fff" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Createpost() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const [format, setFormat] = React.useState("Select File Type");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [resMsg, setResMsg] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error" | "info" | "warning" | undefined>(undefined);
    const [tags, setTags] = React.useState<string[]>([]);
    const [credit, setCredit] = React.useState('');
    const [postData, setPostData] = React.useState({
        title: '',
        description: '',
        post_extension: '',
        post_media: '',
        post_thumbnail: '',
        tags: '',
        post_location: '',
    });
    const [searchVal, setSearchVal] = React.useState('');
    const [minutes, setMinutes] = React.useState<number | string>('');
    const [minutesOptions] = React.useState([15, 30, 45, 60]);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleSnackbarOpen = (message: string, severity: "success" | "error" | "info" | "warning") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const userInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const validatePostData = () => {
        const { title, description, post_extension, post_location, post_media, tags } = postData;
        if (!title.trim() || !description.trim() || !post_extension.trim() || !post_location.trim() || !post_location.trim() || !post_media.trim() || !tags.trim()) {
            // handleSnackbarOpen("All the Fields are required", "error");
            setResMsg("All the (*) mark fields are required ");
            return false;
        }
        console.log("postdata....12", postData)
        return true;
    }
    const handleChangeFormat = (event: SelectChangeEvent) => {
        setFormat(event.target.value);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [file, setFile] = React.useState<File | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setPostData((prevState) => ({
                ...prevState,
                post_extension: (droppedFile.name.split('.').pop() || ''),
                post_media: droppedFile.name
            }));
        }
    };

    const handleNext = () => {
        if (validatePostData()) {
            if (value < 2) {
                handleChange({} as React.SyntheticEvent, value + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (value > 0) {
            handleChange({} as React.SyntheticEvent, value - 1);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            setPostData((prevState) => ({
                ...prevState,
                post_extension: (files[0].name.split('.').pop() || ''),
                post_media: files[0].name
            }));
        }
    };

    const handleSubmit = () => {

        if (validatePostData()) {
            const { title, description, post_location, post_media, post_thumbnail, tags } = postData;
            let payload = {
                title: title,
                description: description,
                post_extension: format,
                post_media: post_media,
                post_thumbnail: "empty",
                post_location: post_location,
                tags: [tags]
            };

            const config: AxiosRequestConfig<any> = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            axios.post("http://65.0.19.86:8000/Post/create_post", payload, config).
                then((res: any) => {
                    handleSnackbarOpen("Post Creted Successfully", "success");
                    navigate("/home");
                }).catch((error: AxiosError) => {
                    // Handle errors
                    console.error('Error:', error.message);
                    if (error.response) {
                        let errorResponse = JSON.parse(JSON.stringify(error.response.data)).message;
                        handleSnackbarOpen(errorResponse, 'error');
                    } else if (error.request) {
                        console.error('Request:', error.request);
                        handleSnackbarOpen(error.request, 'error');
                    } else {
                        console.error('Error:', error.message);
                        handleSnackbarOpen(error.message, 'error');
                    }
                })
        }
    }
    const handleTagChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const newTag = input.value.trim();
        if ((event.key === 'Enter' || event.key === ',') && newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            input.value = '';
        }
    };

    const handleTagDelete = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const handleMinutesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMinutes(event.target.value as number);
    };

    const handleCreditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredit(event.target.value);
    };
    const handleCreditDelete = () => {
        setCredit('');
    };

    return (
        <div className='hostevents' style={{ overflowY: "auto", height: "100vh" }}>

            <Box sx={{ width: '50%', backgroundColor: "#1B1B1B", margin: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", backgroundColor: "#000", padding: "20px" }}>
                    <Typography>
                        <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>
                            <ArrowBackIosIcon />
                        </Link>
                    </Typography>
                    <Typography variant='h5' sx={{ color: "#fff", textAlign: "center", flex: "1" }}>Create Post</Typography>
                </div>
                <Box sx={{ borderBottom: 1, }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant='fullWidth' sx={{ '& .MuiTabs-indicator': { display: 'none' } }}>
                        {/* <Tab sx={{ color: "#fff !important", textTransform: "capitalize",backgroundColor:value === 0 ? "#1B1B1B":"#000" }} label="Upload" {...a11yProps(0)} /> */}
                        <Tab sx={{ color: "#fff !important", textTransform: "capitalize", backgroundColor: value === 0 ? "#1B1B1B" : "#000" }} label="Post Details" {...a11yProps(1)} />
                        <Tab sx={{ color: "#fff !important", textTransform: "capitalize", backgroundColor: value === 1 ? "#1B1B1B" : "#000" }} label="Visibility" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <CustomTabPanel value={value} index={0}>
                    <div>
                        {/* <label>Allowed File Extensions</label> */}
                        <InputLabel id="demo-select-small-label" sx={{ color: "#fff" }}>Allowed File Extensions *</InputLabel>
                        <Select
                            fullWidth
                            sx={{ backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%", marginTop: "2%", border: "1px solid #ccc" }}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={format}
                            label="Select"
                            onChange={handleChangeFormat}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        backgroundColor: "#333333",
                                        border: "1px solid #ccc",
                                        borderRadius: "25px",
                                        color: "lightgrey"
                                    },
                                },
                            }}
                        >
                            <MenuItem value={"Select File Type"}>Select File Type</MenuItem>
                            <MenuItem value={".jpg"}>.jpg</MenuItem>
                            <MenuItem value={".mp4"}>.mp4</MenuItem>
                            <MenuItem value={".png"}>.png</MenuItem>\
                            <MenuItem value={".pdf"}>.PDF</MenuItem>
                            <MenuItem value={".ppt"}>.PPT</MenuItem>
                            <MenuItem value={".word"}>.WORD</MenuItem>
                            <MenuItem value={".jpeg"}>.jpeg</MenuItem>
                            <MenuItem value={".mov"}>.mov</MenuItem>
                        </Select>
                        {format !== "Select File Type" && (
                            <div>
                                <div
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#FFFFFF33",
                                        height: 200,
                                        border: '1px solid #ccc',
                                        display: 'grid',
                                        placeItems: 'center',
                                        borderRadius: "30px",
                                        marginTop: "2%",
                                        marginBottom: "3%"
                                    }}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    {file ? (
                                        <div>
                                            {file.type.includes('image') ? (
                                                <img src={URL.createObjectURL(file)} alt="Dropped Image" height="150px" width="200px" />
                                            ) : (
                                                <video controls>
                                                    <source src={URL.createObjectURL(file)} type={file.type} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                    ) : (<>
                                        <Typography sx={{ marginTop: "5%" }}>Drag & Drop your File Here</Typography>
                                        <Typography>-Or-</Typography>
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            className='next-button'
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            Browse Files
                                            <VisuallyHiddenInput type="file" onChange={handleFileChange} name='post_media' style={{ display: 'none' }} />
                                        </Button>
                                    </>
                                    )}
                                </div>

                                {format === ".mp4" && (
                                    <div>
                                        {/* <span style={{ marginTop: "2%", marginBottom: "3%", display: 'flex', gap: 10 }}>
                                            <Typography >Note: </Typography>
                                            <span className='thumbnai_title'>Minimum of video Size 3mins</span>
                                        </span> */}
                                        <label>Thumbnail</label>
                                        <div
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#FFFFFF33",
                                                height: 130,
                                                border: '1px solid #ccc',
                                                display: 'grid',
                                                placeItems: 'center',
                                                borderRadius: "30px",
                                                marginTop: "2%",
                                                marginBottom: "3%"
                                            }}
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <CloudUploadOutlinedIcon className='cloud-icon' />
                                                <div style={{ marginLeft: '1rem', flexGrow: 1 }}>
                                                    <Button
                                                        component="label"
                                                        role={undefined}
                                                        variant="contained"
                                                        tabIndex={-1}
                                                        className='next-button'
                                                        sx={{ textTransform: "capitalize" }}
                                                    >
                                                        Upload
                                                        <VisuallyHiddenInput type="file" />
                                                    </Button>

                                                    <Typography variant="body2" sx={{ marginTop: '16px' }}>Drop files here or click browse through your machine </Typography>
                                                    <Typography variant="body2" sx={{ marginTop: '13px' }}>Minimum size "808px * 632px"</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>

                        )}
                    </div>
                    <div>
                        <label>Post Title *</label>
                        <TextField fullWidth size='small' name='title' value={postData.title} onChange={userInputChange} placeholder='Title of the new post' sx={{ marginTop: "2%", border: "1px solid #ccc", backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%" }} />
                        <label>Description *</label>
                        <TextField fullWidth size='small' name='description' value={postData.description} onChange={userInputChange} rows={3} placeholder='Description of the post' sx={{ marginTop: "2%", border: "1px solid #ccc", backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%" }} multiline />
                        <label>Post Tags *</label>
                        {/* <TextField fullWidth size='small' name='tags' value={postData.tags} onChange={userInputChange} placeholder='#education' sx={{ marginTop: "2%", border: "1px solid #ccc", backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%" }} /> */}
                        <div style={{ display: 'flex', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '600px' }}>
                                <TextField
                                    value={searchVal}
                                    onChange={(event) => setSearchVal(event.target.value)}
                                    placeholder="Add tags"
                                    onKeyUp={(event) => { handleTagChange(event as React.KeyboardEvent<HTMLInputElement>) }}
                                    sx={{
                                        backgroundColor: '#FFFFFF33',
                                        color: '#fff',
                                        borderRadius: '25px',
                                        border: '1px solid #ccc',
                                        // marginBottom: '3%',
                                        marginTop: '1%',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'transparent',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'transparent',
                                            },
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#fff',
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#fff',
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#fff',
                                        },
                                    }}
                                />
                                {tags.length > 0 && (
                                    <div
                                        style={{
                                            // maxHeight: '150px',
                                            // overflowY: 'auto',
                                            marginTop: '5px',
                                        }}
                                    >
                                        <ul style={{ display: 'flex', flexWrap: 'wrap', padding: 0, listStyle: 'none' }}>
                                            {tags.map((tag, index) => (
                                                <ListItem key={index} style={{ margin: '5px' }}>
                                                    <Chip
                                                        label={tag}
                                                        onDelete={() => handleTagDelete(tag)}
                                                        sx={{ backgroundColor: '#FFFFFF33', color: '#fff' }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>


                        <label style={{ marginTop: "2%" }}>Location *</label>
                        <TextField fullWidth size='small' name='post_location' value={postData.post_location} onChange={userInputChange} placeholder='Add your target location' sx={{ marginTop: "2%", border: "1px solid #ccc", backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%" }} />
                        {resMsg && (
                            <Typography variant="body2" color="red" sx={{ mb: 2 }}>
                                {resMsg}
                            </Typography>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", margin: 10 }}>
                            <Button variant='contained' sx={{ marginTop: "2%", border: "1px solid #ccc", backgroundColor: "transparent", borderRadius: "25px" }} onClick={() => navigate("/home")}>Cancel</Button>
                            <Button variant='contained' className='next-button' onClick={handleNext}>Next</Button>
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant='h6' sx={{ color: "#fff" }}>Video Monetization</Typography>
                        <div style={{ marginBottom: "3%" }}>
                            <label className="switch">
                                <input defaultChecked type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <Typography sx={{ color: "#fff" }}>Permissions</Typography>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Kids Friendly" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Allow Reviews" />
                        <FormControlLabel control={<Checkbox />} label="Comment Visibility" />
                    </div>
                    <div>
                        <Typography sx={{ color: "#fff" }}>Credits</Typography>
                        {/* <TextField fullWidth size='small' placeholder='username' sx={{ backgroundColor: "#FFFFFF33", color: "#fff", borderRadius: "25px", marginBottom: "3%" }} /> */}
                        <Box >
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="username"
                                value={credit}
                                onChange={handleCreditChange}
                                sx={{
                                    backgroundColor: '#FFFFFF33',
                                    color: '#fff',
                                    borderRadius: '25px',
                                    marginBottom: '3%',
                                    '& .MuiInputBase-input': {
                                        // paddingRight: credit ? '48px' : '16px', // Adjust padding when credit is not empty
                                    },
                                }}
                                InputProps={{
                                    endAdornment: credit && (
                                        <Chip
                                            label={credit}
                                            onDelete={handleCreditDelete}
                                            deleteIcon={<CloseIcon />}
                                            sx={{
                                                backgroundColor: '#FFFFFF33',
                                                color: '#fff',
                                                height: '32px',
                                            }}
                                        />
                                    ),
                                }}
                            />
                        </Box>

                    </div>
                    <div>
                        <Typography sx={{ color: "#fff" }}>Notes</Typography>
                        <p>
                            If the content attracts copyright violations or nudity or infringement upon sledge user's privacy or against the local and international law or all of the mentioned, will leads to removal of the content from Sledge.
                        </p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button variant='contained' sx={{ backgroundColor: "transparent", borderRadius: "25px", border: "1px solid #ccc" }} onClick={handlePrevious}>Back</Button>
                        <Button variant='contained' className='next-button' onClick={handleSubmit}>Post</Button>
                    </div>
                </CustomTabPanel>
            </Box>
            <Snackbar open={openSnackbar} className="snackbar" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}