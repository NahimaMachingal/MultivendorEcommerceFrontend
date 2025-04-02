import { Container, Typography, Button, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

        <Typography variant="h6" mt={2}>
          Get started by editing <code>src/app/page.js</code>.
        </Typography>

        <Typography variant="body1" mt={1}>
          Save and see your changes instantly.
        </Typography>

        <Box mt={3} display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
          >
            Deploy Now
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
          >
            Read Docs
          </Button>
        </Box>

        <Box mt={5}>
          <Typography variant="body2">Explore More:</Typography>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2} gap={1}>
            <Link href="https://nextjs.org/learn" passHref>
              <Button variant="text">Learn</Button>
            </Link>
            <Link href="https://vercel.com/templates?framework=next.js" passHref>
              <Button variant="text">Examples</Button>
            </Link>
            <Link href="https://nextjs.org" passHref>
              <Button variant="text">Go to nextjs.org →</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
