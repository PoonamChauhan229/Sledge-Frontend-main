import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface StrikeOrClaimDialogProps {
    open: boolean;
    onClose: () => void;
    type: 'strike' | 'claim' | 'sharedWith' | 'sharedFrom';
}

const StrikeOrClaimDialog: React.FC<StrikeOrClaimDialogProps> = ({ open, onClose, type }) => {
    const renderDialogContent = () => {
        switch (type) {
            case 'strike':
                return (
                    <>
                        <Typography sx={{ color: 'white', mb: 2 }}>Type of Strike</Typography>
                        <TextField
                            fullWidth
                            placeholder="Adult Content"
                            InputProps={{
                                sx: {
                                    bgcolor: '#333',
                                    border: "1px solid #ccc",
                                    borderRadius: "25px",
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#555',
                                    },
                                },
                            }}
                            sx={{ mb: 2 }}
                        />
                        <Typography sx={{ color: 'white', mb: 2 }}>Description</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Describe your Appeal"
                            InputProps={{
                                sx: {
                                    bgcolor: '#333',
                                    color: 'white',
                                    border: "1px solid #ccc",
                                    borderRadius: "25px",
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#555',
                                    },
                                },
                            }}
                            sx={{ mb: 2 }}
                        />
                    </>
                );
            case 'claim':
                return (
                    <>
                        <Typography align="center" sx={{ color: 'white', mb: 2, fontWeight: "bold", fontSize: "19px" }}>
                            Your Content Owner "Radhika Agarwal" has proved their claim
                        </Typography>
                        <Typography variant="body2" align="center" sx={{ color: "#fff", p: 3 }}>
                            If you have an Appeal to make
                        </Typography>
                    </>
                );
            case 'sharedWith':
                return (
                    <>
                        <Typography sx={{ color: 'white', mb: 2 }}>Shared With</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter details"
                            InputProps={{
                                sx: {
                                    bgcolor: '#333',
                                    border: "1px solid #ccc",
                                    borderRadius: "25px",
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#555',
                                    },
                                },
                            }}
                            sx={{ mb: 2 }}
                        />
                    </>
                );
            case 'sharedFrom':
                return (
                    <>
                        <Typography sx={{ color: 'white', mb: 2 }}>Shared From</Typography>
                        <TextField
                            fullWidth
                            placeholder="Enter details"
                            InputProps={{
                                sx: {
                                    bgcolor: '#333',
                                    border: "1px solid #ccc",
                                    borderRadius: "25px",
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#555',
                                    },
                                },
                            }}
                            sx={{ mb: 2 }}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: 'black',
                    borderRadius: '14px',
                    maxWidth: '600px',
                    width: '100%'
                }
            }}
        >
            <DialogContent sx={{ p: 5 }}>
                {renderDialogContent()}
                <Box
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: '15px',
                        p: 2,
                        textAlign: 'center',
                        mb: 2,
                        bgcolor: '#333',
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#999' }}>
                        Drag and drop your file here
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999' }}>
                        - or -
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            mt: 1,
                            background: "linear - gradient(to bottom, #01e5d4, #137aea)",
                            color: '#fff',
                            borderRadius: "25px",
                            textTransform: "none",
                            '&:hover': { background: "linear - gradient(to bottom, #01e5d4, #137aea)" }
                        }}
                    >
                        Browse Files
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
                <Button
                    onClick={onClose}
                    sx={{ color: '#fff', textTransform: 'none', border: "1px solid #ccc", borderRadius: "25px", padding: 2 }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        background: "linear - gradient(to bottom, #01e5d4, #137aea)",
                        color: '#fff',
                        borderRadius: "25px",
                        textTransform: 'none',
                        padding: 2,
                        '&:hover': {
                            background: "linear - gradient(to bottom, #01e5d4, #137aea)", borderRadius: "25px"
                        }
                    }}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StrikeOrClaimDialog;
