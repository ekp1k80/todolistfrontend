import { getAccessToken } from '@auth0/nextjs-auth0';
// @ts-expect-error asd
export default async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get access token' });
  }
}