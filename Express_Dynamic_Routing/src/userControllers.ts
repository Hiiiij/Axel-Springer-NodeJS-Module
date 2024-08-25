import { Request, Response } from "express" //@types/express

// let users = [{
//     id:1,
//     name: "Beta",
//     age: 66
// },

// {
//     id: 2,
//     name: "Shenoa",
//     age: 25
//     },

// {
//     id: 3,
//     name: "Nana",
//     age: 5
//     },
// {
//     name: "Lou",
//     age: 6
// }];
let users: User[] = [];
let nextId = 1;

const getAll = (req: Request, res: Response) => {
    res.json(users); // send users in a json response
};

const get = (req: Request, res: Response) => { 
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        res.status(404).json({ message: "User not Found;" })
    }
    res.status(200).json(user);
}

const post = (req: Request, res: Response) => {
    const id = Math.floor(Math.random() * 10000)
    const user = { ...req.body, id }; // {name: body.name, id: id}
    users.push(user);
    console.log(user);
    res.status(201).json(user); //201: created
}

const remove = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    users = users.filter((user) => user.id !== id);
    res.json({ message: "user deleted succefully" }) //200:ok
}

const put = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedUser = { ...req.body, id }
    users = users.map((user) => {
        if (user.id === id) {
            return updatedUser;
        }
        return user
    });

    res.json(updatedUser)
}

export default { getAll, get, post, put, remove };