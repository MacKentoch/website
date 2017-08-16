exports.seed = async knex => {
  await knex('trainers').insert([
    {
      first_name: 'Greg',
      last_name: 'Bergé',
      slug: 'greg-berge',
      description: `[Greg Bergé](https://github.com/neoziro) est passionné depuis toujours par le web et plus particulièrement par le langage JavaScript. Développeur depuis les années 2000, il a su évoluer et renforcer son expertise au fil du temps. Il commence sa carrière professionnel comme stagiaire au monde. En 3 ans, il devient lead développeur et fait ses preuves sur le projet de refonte du système de gestion de contenu (CMS) du groupe Le Monde en Node.js et AngularJS. Par la suite, il offre son expertise comme freelance pour plusieurs startups (dont Doctolib pendant 2 ans) et donne des formations dans le monde entier : Paris, San Francisco, Genêve, Nouméa... Il est aussi auteur de plusieurs projets open-source dont le plus célèbre est Shipit (+3.7K stars sur GitHub).`,
      picture: 'profile_greg_ihxwjo',
    },
    {
      first_name: 'Adrien',
      last_name: 'Joly',
      slug: 'adrien-joly',
      description: `Adrien Joly est tombé dans le code à l'âge de 6 ans, puis a découvert les joies du langage JavaScript lors de son premier stage en entreprise, en 2002. Après un passage en SSII et en doctorat, il a été en charge du développement d'une application web basée sur la version 0.3 de Node.js, à l'époque où cette technologie était encore expérimentale. Désormais, Adrien enseigne la programmation JavaScript aux étudiants de première année de l'EEMI, coordonne les contributeurs de la plateforme musicale Openwhyd depuis que son code source a été ouvert au public, et développe des outils de productivité pour enseignants et formateurs, entre deux side-projects.`,
      picture: 'profile_adrien_joly_nzumvy',
    },
  ])

  const trainings = await knex('trainings').orderBy('id', 'asc').limit(2)
  const trainers = await knex('trainers')

  await knex('trainings_trainers').insert(
    trainings.reduce(
      (inserts, { id: training_id }) => [
        ...inserts,
        ...trainers.map(({ id: trainer_id }) => ({
          training_id,
          trainer_id,
        })),
      ],
      [],
    ),
  )
}
