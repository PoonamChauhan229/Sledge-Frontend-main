import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, RadioGroup, FormControlLabel, Radio, TextField, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Step1Img from '../assets/step1.png';
import Step2Img from '../assets/step2.png';
import Step3Img from '../assets/step3.png';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BASE_URL_USER } from '../apiEndpoints';

interface Question {
    question: string;
    options: string[];
    imageUrl: string;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const questions: Question[] = [
    { question: 'What is your current Role ?', options: ['Student', 'Freelancer', 'Teacher', 'Business Owner', 'Software Professional', 'Others'], imageUrl: Step1Img },
    { question: 'Why Sledge ?', options: ['Entertainment', 'Side Hustle', 'Learning & Knowledge', 'Ads & Leads', 'Others'], imageUrl: Step2Img },
    { question: 'How did you hear about us ?', options: ['Friends', 'Google', 'Email', 'LinkedIn', 'Others'], imageUrl: Step3Img }
];

const OnBoarding: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [otherInput, setOtherInput] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNext = () => {
        if ((answers[activeStep].trim() === '') || (answers[activeStep] === 'Other' && otherInput.trim() === '')) {
            setError(true);
        } else {
            if (activeStep === questions.length - 1) {
                handleFinish();
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setError(false);
                setOtherInput('');
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setError(false);
    };

    const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[activeStep] = event.target.value;
        setAnswers(newAnswers);
        setError(false); // Reset error when an option is selected
    };

    const handleFinish = () => {
        const formData = {
            "ques_1_answer": answers[0],
            "ques_2_answer": answers[1],
            "ques_3_answer": answers[2]
        };

        const config: AxiosRequestConfig<any> = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        axios.put(BASE_URL_USER + 'update_user_onboarding', formData, config)
            .then((res) => {
                console.log("onboarding data....", res);
                navigate('/home');
            })
            .catch((err: AxiosError) => {
                console.log(err)
            });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtherInput(event.target.value);
    };

    const currentQuestion = questions[activeStep];

    return (
        <Grid container sx={{ height: "100vh", backgroundColor: "#000", justifyContent: "center", alignItems: "center" }} className='onboarding'>
            <Grid item xs={5}>
                <Typography variant='h4' sx={{ textAlign: "center", color: "#fff", marginBottom: "3rem" }}>Create a Profile</Typography>
                <Item sx={{ backgroundColor: "#1B1B1B", color: "#fff", borderRadius: "10px", margin: "5px" }}>
                    <div>
                        {activeStep === questions.length ? (<>{navigate('/dashboard')}</>) : (
                            <div style={{ marginLeft: "30px", padding: "10px" }}>
                                <Typography variant="h6" sx={{ textAlign: "left", color: "#9797A5" }}>{`Question ${activeStep + 1}:`}</Typography>
                                <Typography variant="h6" sx={{ textAlign: "left" }}>{currentQuestion.question}</Typography>
                                <RadioGroup value={answers[activeStep]} onChange={handleAnswer}>
                                    {currentQuestion.options.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={option}
                                            control={<Radio />}
                                            label={option === 'Other' ?
                                                <TextField
                                                    value={otherInput}
                                                    onChange={handleInputChange}
                                                    placeholder="Other"
                                                    size="small"
                                                    variant="outlined"
                                                    fullWidth
                                                /> : option}
                                        />
                                    ))}
                                </RadioGroup>
                                {error && <Typography variant="body2" color="red" sx={{ textAlign: "left" }}>
                                    Please select an option.
                                </Typography>}
                                <div style={{ display: "flex", justifyContent: "space-between", padding: "5px" }}>
                                    <Button sx={{ color: "#fff !important", backgroundColor: "transparent", border: "1px solid gray", borderRadius: "25px !important" }} variant="contained" disabled={activeStep === 0} onClick={handleBack}>
                                        Back
                                    </Button>
                                    <Button className='step-button' variant="contained" onClick={handleNext}>
                                        {activeStep === questions.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Item>
            </Grid>
            <Grid item xs={5} sx={{ marginTop: "5rem" }}>
                <Item sx={{ backgroundColor: "transparent", margin: "5px" }}>
                    <img src={currentQuestion ? currentQuestion.imageUrl : ''} alt={currentQuestion ? currentQuestion.question : ''} height={400} width={400} />
                    <Stepper activeStep={activeStep}>
                        {questions.map((question, index) => (
                            <Step key={index}>
                                <StepLabel>{``}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Item>
            </Grid>
        </Grid>
    );
};

export default OnBoarding;
