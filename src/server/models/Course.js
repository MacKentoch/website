import BaseModel, { mergeSchemas } from 'server/models/BaseModel'

export default class Course extends BaseModel {
  static tableName = 'courses'

  static jsonSchema = mergeSchemas(BaseModel.jsonSchema, {
    required: ['title', 'outline'],
    properties: {
      title: { type: 'string' },
      outline: { type: 'string' },
    },
  })

  static relationMappings = {
    trainings: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: 'Training',
      join: {
        from: 'courses.id',
        through: {
          from: 'trainings_courses.course_id',
          to: 'trainings_courses.training_id',
        },
        to: 'trainings.id',
      },
    },
  }
}
