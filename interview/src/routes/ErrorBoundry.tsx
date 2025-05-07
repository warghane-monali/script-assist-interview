import { Center, Container, Title, Text } from '@mantine/core';

const ErrorBoundary = () => {
  return (
    <Container size="md" style={{ height: '100vh' }}>
      <Center style={{ height: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title order={1} color="red">
            Sorry, it's an error
          </Title>
          <Text size="xl" mt="md">
            You hit an Error Boundary 😅
          </Text>
        </div>
      </Center>
    </Container>
  );
};

export default ErrorBoundary;
