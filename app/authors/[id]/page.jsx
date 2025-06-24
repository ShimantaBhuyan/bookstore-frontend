import AuthorDetails from "../../../components/AuthorDetails.jsx";

export default async function AuthorDetailsPage({ params }) {
  const { id } = await params;
  return <AuthorDetails authorId={id} />;
}
