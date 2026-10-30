
let posts = [];
let nextId = 1;

export async function GET() {
  return Response.json(posts);
}

export async function POST(request) {
  const { title, description } = await request.json();

  if (!title || !description) {
    return Response.json(
      { message: "Maydonlarni to'ldiring" },
      { status: 400 }
    );
  }

  const post = {
    id: nextId++,
    title,
    description,
  };

  posts.push(post);

  return Response.json(post, { status: 201 });
}

export async function DELETE(request) {
  const { id } = await request.json();

  posts = posts.filter((post) => post.id !== id);

  return Response.json({ message: "Post o'chirildi" });
}
