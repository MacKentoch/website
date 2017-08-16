import { trainingRoute } from 'modules/routePaths'
import BaseModel, { mergeSchemas } from 'server/models/BaseModel'
import { clUrl } from 'modules/cloudinary'

export default class Training extends BaseModel {
  static tableName = 'trainings'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'icon', 'slug'],
    properties: {
      rank: { type: 'integer' },
      title: { type: 'string' },
      abstract: { type: 'integer' },
      description: { type: 'string' },
      objectives: { type: 'string' },
      prerequisites: { type: 'string' },
      icon: { type: 'string' },
      slug: { type: 'string' },
      social_icon: { type: 'string' },
      social_title: { type: 'string' },
      social_abstract: { type: 'string' },
    },
  })

  static relationMappings = {
    path: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: 'Path',
      join: {
        from: 'trainings.path_id',
        to: 'paths.id',
      },
    },
    sessions: {
      relation: BaseModel.HasManyRelation,
      modelClass: 'TrainingSession',
      join: {
        from: 'trainings.id',
        to: 'training_sessions.training_id',
      },
    },
    trainers: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Trainer',
      join: {
        from: 'trainings.id',
        through: {
          from: 'trainings_trainers.training_id',
          to: 'trainings_trainers.trainer_id',
        },
        to: 'trainers.id',
      },
    },
    courses: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Course',
      join: {
        from: 'trainings.id',
        through: {
          from: 'trainings_courses.training_id',
          to: 'trainings_courses.course_id',
        },
        to: 'courses.id',
      },
    },
  }

  link() {
    return trainingRoute(this.slug)
  }

  socialPicture() {
    const cloudinaryId = this.social_icon || this.icon
    return `https:${clUrl(cloudinaryId, 'c_scale,w_1200')}`
  }

  duration() {
    if (!this.courses) {
      throw new Error('Courses must be loaded to get "duration".')
    }

    return this.courses.length / 2
  }

  intraPrice() {
    if (!this.courses) {
      throw new Error('Courses must be loaded to get "intraPrice".')
    }

    // 200 € / course
    return this.courses.length * 200
  }

  async siblings() {
    return Training.query()
      .whereNot({ id: this.id })
      .orderByRaw('random()')
      .limit(2)
  }

  async sessions() {
    return this.$relatedQuery('sessions')
      .whereRaw("start_date > now() + interval '1 day'")
      .orderBy('start_date', 'asc')
      .limit(3)
  }

  async trainers() {
    return this.$relatedQuery('trainers')
  }
}
