
![Logo](https://raw.githubusercontent.com/reet9065/GitHub-User-Info-Explorer/master/assets/readmeimgs/logo.png)



# GitHub User Info Explorer | [Live running](https://www.google.com/)


The GitHub User Info Explorer is a user-friendly application designed to provide instant insights into GitHub users' profiles. With a simple and intuitive interface, users can quickly retrieve comprehensive information about any GitHub username they enter into the search bar.


## Features

- **User-Friendly Interface**: The application boasts a clean and straightforward      design, ensuring ease of use for users of all experience levels.
- **GitHub User Information**: Upon entering a GitHub username, the application fetches and displays essential details, including the user's name, Twitter username (if available), GitHub profile link, and bio.
- **Latest Repositories**: The GitHub User Info Explorer doesn't stop at user details. It also provides a snapshot of the user's 10 latest repositories, allowing users to stay updated on their recent projects.
- **Real-Time Data**: The application ensures that the information displayed is up-to-date, giving users an accurate representation of the GitHub user's current profile and recent activities.


## Run Locally

Clone the project

```bash
  git clone https://github.com/reet9065/GitHub-User-Info-Explorer.git
```

Go to the project directory

```bash
  cd GitHub-User-Info-Explorer
```



## API Reference

#### suggesting user each time after 1 Second when  the user stopped typing

```https
  GET https://api.github.com/search/users?q=${UserInput}&per_page=10
```

| Query parameter 1st  | Query parameter 2nd    | Type                |
| :--------            | :-------               | :------------------------- |
| `q`            | `per_page`               | `string` |

#### Geting user Onclick

```https
  GET https://api.github.com/users/${username}
```

| parameter            |  Type    |
| :--------            |  :-------|
| `${username}`        | `string` |

#### Geting repos

```https
  GET https://api.github.com/users/${e.dataset.username}/repos?per_page=10&sort=created&direction=desc
```

|parameter       | 1st         |  2nd   | 3rd       | Type |
| :----          | :------     | :---   |:----      |:-----|
| `${username}`  | `per_page`  | `sort` |`direction`|`string`|



## Acknowledgements

 - [GitHub API](https://docs.github.com/en/rest?apiVersion=2022-11-28)


## Screenshots

![App Screenshot](https://raw.githubusercontent.com/reet9065/GitHub-User-Info-Explorer/master/assets/readmeimgs/appScreenShort.png)


## Feedback

If you have any feedback, please reach out to us at rit906570@gmail.com

