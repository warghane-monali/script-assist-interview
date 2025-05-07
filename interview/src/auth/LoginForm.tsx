import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Container, Group, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/app.store';  // import the zustand store

function LoginForm() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { login } = useAuthStore(); // access the login function from Zustand

  const form = useForm({
    initialValues: {
      userName: '',
      password: '',
    },

    validate: {
      userName: (value) => (value ? null : 'Please Enter Username'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  // Login API
  const handleSubmit = async () => {
    const { userName, password } = form.values;
    setLoader(true);
    try {
      const payload = {
        userName,
        password,
      };

      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setLoader(false);
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("data response", data.data)
      if (data?.message === 'Login Successful') {
        setLoader(false);
        localStorage.setItem('userData', JSON.stringify(data));
        login(userName);
        

        showNotification({
          title: 'Login Successful',
          message: `Welcome!`,
          color: 'green',
        });
        navigate('/dashboard/info');
      }
      else if(data?.message === "No user found"){
        showNotification({
          title: 'User Not Found!',
          message: `Please enter correct Username and Password`,
          color: 'red',
        });
      }else if(data?.message === "Wrong Password"){
        showNotification({
          title: 'Wrong Password!',
          message: `Please provide correct Password`,
          color: 'red',
        });
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('Failed to fetch users:', error);
    }
  };

  return (
    <Container size={600} my={40}>
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Please enter your credentials to log in
      </Text>

      <Paper  shadow="md" p={30} mt={30} radius="md">

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Username"
            placeholder="username"
            labelProps={{ style: { color: 'black' } }}
            {...form.getInputProps('userName')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            labelProps={{ style: { color: 'black' } }}
            {...form.getInputProps('password')}
          />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            {loader ? 
              <Loader size={30} /> :
              <Button type="submit" className="login-btn">Log In</Button>
            }
          </div>
        </form>

      </Paper>
    </Container>
  );
}

export default LoginForm;
